import { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native'
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomActions from './CustomActions'
import MapView from 'react-native-maps'

const Chat = ({ isConnected, db, storage, route, navigation }) => {
  const { userID, name } = route.params
  const [messages, setMessages] = useState([])
  
  let unsubMessages
  
  // Verify if user is connected then determine where to load messages from
  // OFFLINE: from cache
  // ONLINE: from cloud
  useEffect(() => {
    navigation.setOptions({ title: name })

    if (isConnected === true) { // user is online: load messages from cloud

      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed
      if (unsubMessages) unsubMessages()
      unsubMessages = null
    
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
      unsubMessages = onSnapshot(q, documentsSnapshot => {
        let newMessages = []
        documentsSnapshot.forEach(doc => {
          newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()) })
        })
        cacheMessages(newMessages)
        setMessages(newMessages)
      })
    } else loadCachedMessages() // user is offline: load messages from cache

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages()
    }
  }, [isConnected])

  // Load messages from local storage (AsyncStorage)
  const loadCachedMessages = async () => {
    const cachedMessages = AsyncStorage.getItem('messages') || []
    setMessages(JSON.parse(cachedMessages))
  }

  // Cache messages to local storage (AsyncStorage)
  const cacheMessages = async (messagesToCache) => {
    try {
      new AsyncStorage.setItem('messages', JSON.stringify(messagesToCache))
    } catch (err) {
      console.log(err.message)
    }
  }

  // Add message to the 'messages' collection in firebase on button press
  const onSend = newMessages => {
    addDoc(collection(db, 'messages'), newMessages[0])
  }

  // Render bubble (message) with a wrapperStyle to differentiate between right and left
  const renderBubble = props => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: '#000' },
        left: { backgroundColor: '#FFF' }
      }}
    />
  }

  const renderInputToolbar = props => {
    if (isConnected) return <InputToolbar {...props} />
    else return null
  }

  // Custom actions are the button on the left of the input field and include
  // 1. Choose From Library
  // 2. Take a Picture
  // 3. Send Location
  // 4. Cancel
  const renderCustomActions = props => {
    return <CustomActions storage={storage} userID={userID} {...props} />
  }

  // Custom Views can be created here based on properties of the message from the props param
  const renderCustomView = props => {
    const { currentMessage } = props
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          return={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      )
    }
  }
  
  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={messages => onSend(messages)}
        user={{ _id: userID, name }}
      />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null }
    </View>
  )
}

export default Chat
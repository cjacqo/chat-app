import { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native'
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Chat = ({ isConnected, db, route, navigation }) => {
  const { userID, name, color } = route.params
  const [messages, setMessages] = useState([])
  
  let unsubMessages
  
  useEffect(() => {
    navigation.setOptions({ title: name })

    // unregister current onSnapshot() listener to avoid registering multiple listeners when
    // useEffect code is re-executed
    if (unsubMessages) unsubMessages()
    unsubMessages = null

    if (isConnected === true) {
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
      unsubMessages = onSnapshot(q, documentsSnapshot => {
        let newMessages = []
        documentsSnapshot.forEach(doc => {
          newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()) })
        })
        cacheMessages(newMessages)
        setMessages(newMessages)
      })
    } else loadCachedMessages()

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages()
    }
  }, [])

  const loadCachedMessages = async () => {
    const cachedMessages = AsyncStorage.getItem('messages') || []
    setMessages(JSON.parse(cachedMessages))
  }

  const cacheMessages = async (messagesToCache) => {
    try {
      new AsyncStorage.setItem('messages', JSON.stringify(messagesToCache))
    } catch (err) {
      console.log(err.message)
    }
  }

  const onSend = newMessages => {
    addDoc(collection(db, 'messages'), newMessages[0])
  }

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
  
  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={messages => onSend(messages)}
        user={{ _id: userID, name }}
      />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null }
    </View>
  )
}

export default Chat
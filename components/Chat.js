import { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native'
import { Bubble, GiftedChat } from 'react-native-gifted-chat'

const Chat = ({ route, navigation }) => {
  const { name, color } = route.params
  const [messages, setMessages] = useState([])
  
  useEffect(() => {
    navigation.setOptions({ title: name })

    setMessages([
      {
        _id: 1,
        text: 'Hello, developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any'
        }
      },
      {
        _id: 2,
        text: `${name} has entered the chat`,
        createdAt: new Date(),
        system: true
      }
    ])
  }, [])

  const onSend = newMessages => {
    setMessages(prevMsgs => GiftedChat.append(prevMsgs, newMessages))
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
  
  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{ id: 1 }}
      />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null }
    </View>
  )
}

export default Chat
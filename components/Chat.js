import { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'

const Chat = ({ route, navigation }) => {
  const { name, color } = route.params
  
  useEffect(() => {
    navigation.setOptions({ title: name })
  }, [])
  
  return (
    <View style={{ backgroundColor: color }}>
      <Text>Start Chatting!</Text>
    </View>
  )
}

export default Chat
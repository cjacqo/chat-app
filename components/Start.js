import { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ImageBackground, Platform, KeyboardAvoidingView, Alert } from 'react-native'
import { getAuth, signInAnonymously } from 'firebase/auth'

const Start = ({ navigation }) => {
  const [name, setName] = useState('')
  const [color, setColor] = useState('#090C08')

  const auth = getAuth()

  // Callback function to sign user in and pass userID, name and color to the next page
  const signInUser = () => {
    signInAnonymously(auth)
      .then(res => {
        navigation.navigate('Chat', { userID: res.user.uid, name, color })
        Alert.alert('Signed in Successfully!')
      })
      .catch(err => {
        Alert.alert('Unable to sign in, try again later.')
      })
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imgBg}
        source={require('../assets/bg-img.png')}
        resizeMode='cover'>
        <View style={styles.appTitleContainer}>
          <Text style={styles.appTitle}>Chat App</Text>
        </View>
        <View style={styles.userInputContainer}>
          <View>
            <TextInput
              style={[ styles.layoutStyle1, styles.fontStyle1, styles.textInput]}
              value={name}
              onChangeText={setName}
              placeholder='Your name' />
            </View>
          <View>
            <Text style={[ styles.layoutStyle1, styles.fontStyle1, styles.bgColorText ]}>Choose Background Color:</Text>
            <View style={[ styles.layoutStyle1, styles.colorBtnsContainer ]}>
              <TouchableOpacity
                style={[ styles.colorBtn, styles.colorBtn1, color === '#090C08' ? styles.selectedColor : null ]}
                onPress={() => setColor('#090C08')} />
              <TouchableOpacity
                style={[ styles.colorBtn, styles.colorBtn2, color === '#474056' ? styles.selectedColor : null ]}
                onPress={() => setColor('#474056')} />
              <TouchableOpacity
                style={[ styles.colorBtn, styles.colorBtn3, color === '#8A95A5' ? styles.selectedColor : null ]}
                onPress={() => setColor('#8A95A5')} />
              <TouchableOpacity
                style={[ styles.colorBtn, styles.colorBtn4, color === '#B9C6AE' ? styles.selectedColor : null ]}
                onPress={() => setColor('#B9C6AE')} />
            </View>
          </View>
          <View style={[ styles.layoutStyle1 ]}>
            <TouchableOpacity
              style={[ styles.startChattingBtn ]}
              onPress={signInUser}>
              <Text style={[ styles.fontStyle1, styles.startChattingBtnText ]}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      {/* Check for os and decide on behavior of the keyboard */}
      { Platform.OS === 'ios' ? <KeyboardAvoidingView behavior='padding' /> : null }
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imgBg: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  appTitleContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  appTitle: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 100
  },
  userInputContainer: {
    flex: 1,
    width: '88%',
    height: '44%',
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    marginBottom: 30
  },
  layoutStyle1: {
    width: '88%',
    alignSelf: 'center'
  },
  fontStyle1: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
  },
  textInput: {
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    opacity: 50
  },
  bgColorText: {
    opacity: 100
  },
  colorBtnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 30
  },
  colorBtn: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  colorBtn1: {
    backgroundColor: '#090C08'
  },
  colorBtn2: {
    backgroundColor: '#474056'
  },
  colorBtn3: {
    backgroundColor: '#8A95A5'
  },
  colorBtn4: {
    backgroundColor: '#B9C6AE'
  },
  selectedColor: {
    borderWidth: 1,
    borderColor: 'red'
  },
  startChattingBtn: {
    backgroundColor: '#757083',
    paddingTop: 15,
    paddingBottom: 15
  },
  startChattingBtnText: {
    color: '#FFFFFF',
    textAlign: 'center'
  }
})

export default Start
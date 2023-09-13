import { TouchableOpacity, StyleSheet, View, Text, Alert } from 'react-native'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'

const CustomActions = ({ wrapperStyle, iconTextStyle, userID, onSend, storage }) => {
  const actionSheet = useActionSheet()
  
  // Determine which type of message the user wants to send run appropriate function
  const onActionPress = () => {
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel']
    const cancelButtonIndex = options.length - 1
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage()
            return
          case 1:
            takePhoto()
            return
          case 2:
            getLocation()
            return
          default:
        }
      }
    )
  }

  // Ask for user's permission to access their location then send location via message
  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync()
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({})
      if (location) {
        onSend({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
          }
        })
      } else Alert.alert('Error occured while fetching location')
    } else Alert.alert('Permissions haven\'t been granted')
  }

  // Create a reference to a photo the user sends, convert to a BLOB, then upload and send photo message
  const uploadAndSendImage = async (imageURI) => {
    const newUploadRef = ref(storage, generateReference(imageURI))
    const response = await fetch(imageURI)
    const blob = await response.blob()
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      const imageURL = await getDownloadURL(snapshot.ref)
      onSend({ image: imageURL })
    })
  }
  
  // Ask for user's permission to access their photo library then send photo a user selects
  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync()
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri)
      else Alert.alert('Permissions haven\'t been granted')
    }
  }

  // Ask for user's permission to access their camera then send photo they take with camera
  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync()
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync()
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri)
      else Alert.alert('Permissions haven\'t been granted')
    }
  }

  // Used to generate a unique reference ID for an image
  const generateReference = uri => {
    const timeStamp = new Date().getTime()
    const imageName = uri.split('/')[uri.split('/').length - 1]
    return `${userID}-${timeStamp}-${imageName}`
  }
  
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onActionPress}>
        <View style={[styles.wrapper, wrapperStyle]}>
          <Text style={[styles.iconText, iconTextStyle]}>+</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#B2B2B2',
    borderWidth: 2,
    flex: 1
  },
  iconText: {
    color: '#B2B2B2',
    fontWeight: 'bold',
    fontSize: 10,
    backgroundColor: 'transparent',
    textAlign: 'center'
  }
})

export default CustomActions
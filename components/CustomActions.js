import { TouchableOpacity, StyleSheet, View, Text, Alert } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet'
import * as Location from 'expo-location'

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend }) => {
  const actionSheet = useActionSheet()
  
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
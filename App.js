import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNetInfo } from '@react-native-community/netinfo'
import { useEffect } from 'react';
import Start from './components/Start';
import Chat from './components/Chat';

// Create the navigator
const Stack = createNativeStackNavigator()

import { initializeApp } from 'firebase/app'
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore'

const App = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA7MwgJ_NKS9Oke9fICbW62CdazKEEggX8",
    authDomain: "chat-app-7c438.firebaseapp.com",
    projectId: "chat-app-7c438",
    storageBucket: "chat-app-7c438.appspot.com",
    messagingSenderId: "59523758837",
    appId: "1:59523758837:web:39776743c27773497e23bc"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app)

  const connectionStatus = useNetInfo()

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection lost!')
      disableNetwork(db)
    } else if (connectionStatus.isConnected === true) enableNetwork(db)
  }, [connectionStatus.isConnected])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen
          name='Start'
          component={Start} />
        <Stack.Screen name='Chat'>
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect }from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { signIn } from './backendFuntions/signIn';
import { CreateAccount } from './backendFuntions/createAccount';
import { initializeFirebase } from './backendFuntions/initializeFirebase'
import { HomeScreen } from './screens/HomeScreen';
import {AddPhotosScreen} from './screens/AddPhotosScreen';
import * as firebase from 'firebase';

const Stack = createStackNavigator();
initializeFirebase();


function mainApp(){

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
        tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
    <Tab.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="home-circle" color={"black"} size={size} />
          ),
        }}
    />

      <Tab.Screen 
      name="AddPhotosScreen" 
      component={AddPhotosScreen} 
      options={{
      tabBarLabel: 'Photos',
      tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="camera-outline" color={"black"} size={size} />
        ),
      }}

      />

      /*
        Here, you can be able to create multiple tabs that  lead to multiple screens
        for your Application
      */

    </Tab.Navigator>
  );
}



export default function App() {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  if (initializing) return null;

  if (!user){

    return (

      <View style={styles.container}>

        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter email"
          onChangeText={userEmail => setEmail(userEmail)}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={userPassword => setPassword(userPassword)}
        />

        <Button
          title="Create an Account!"
          onPress={() => CreateAccount(email,password)}
        />

        <Button
          title="Sign In!"
          onPress={() => signIn(email,password)}
        />



    </View>
  );

}

if (user){

  return (

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome to your App!" component={mainApp} />
        </Stack.Navigator>
      </NavigationContainer>

  );

}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    input: {

    borderWidth:1,
    borderColor: '#777',
    margin: 10,
    width:200,
  },

});

import * as firebase from 'firebase';
import { StyleSheet,Button, Text, View, TextInput} from 'react-native';
import {useState, useEffect} from 'react';
import { initializeFirebase } from './initializeFirebase'

initializeFirebase();


export function LoginUser(email,password) {

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


  firebase.auth()
  .signInWithEmailAndPassword(email,password)
  .then(() => {
    console.log('User signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });

}
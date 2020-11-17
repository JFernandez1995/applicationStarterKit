import * as firebase from 'firebase';
import { StyleSheet,Button, Text, View, TextInput} from 'react-native';
import {useState, useEffect} from 'react';
import { initializeFirebase } from './initializeFirebase'

initializeFirebase();

export function signOut() {


  firebase.auth()
  .signOut()
  .then(() => console.log('User signed out!'));

 }
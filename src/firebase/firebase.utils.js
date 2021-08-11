import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
    apiKey: "AIzaSyBrn6bKLagIYC7PATRXyh5ao2IggLwjHLg",
    authDomain: "crwn-db-ee73a.firebaseapp.com",
    projectId: "crwn-db-ee73a",
    storageBucket: "crwn-db-ee73a.appspot.com",
    messagingSenderId: "991415621231",
    appId: "1:991415621231:web:58d3b13250fa0285435f9a",
    measurementId: "G-5THDD4ET3C"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  
  provider.setCustomParameters({prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
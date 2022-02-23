import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
  apiKey: "AIzaSyBQbBZIbruAZ5vPfGuCNeTucEn_qA-eQbM",
  authDomain: "newcrown-db.firebaseapp.com",
  projectId: "newcrown-db",
  storageBucket: "newcrown-db.appspot.com",
  messagingSenderId: "895490469865",
  appId: "1:895490469865:web:14d98c310b56e83a316578",
  measurementId: "${config.measurementId}"
  };

  export const createUserProfileDocument = async (userAuth,additionalData)=>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
    const snapShot = await userRef.get();

    

    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();
    
      try{
           await userRef.set({
             displayName,
             email,
             createdAt,
             ...additionalData
           })
      }
      catch(error){
          console.log('error creating users', error.message);
      }
    }
    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  
  provider.setCustomParameters({prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
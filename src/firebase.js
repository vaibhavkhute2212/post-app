import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA1m0J1ww-nXhDceGj9OKhkR5NIYv_-q3c",
    authDomain: "post-app-9e5e3.firebaseapp.com",
    projectId: "post-app-9e5e3",
    storageBucket: "post-app-9e5e3.appspot.com",
    messagingSenderId: "964387035499",
    appId: "1:964387035499:web:5b4f94d0ad9e3abb7b942e"
  };  


const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth , provider}
export default db 
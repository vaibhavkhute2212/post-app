import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyA1m0J1ww-nXhDceGj9OKhkR5NIYv_-q3c",
  authDomain: "post-app-9e5e3.firebaseapp.com",
  projectId: "post-app-9e5e3",
  storageBucket: "post-app-9e5e3.appspot.com",
  messagingSenderId: "964387035499",
  appId: "1:964387035499:web:5b4f94d0ad9e3abb7b942e"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

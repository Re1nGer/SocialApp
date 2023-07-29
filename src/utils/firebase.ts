import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXgEXuez0ev-u2yOyK9oWFWv_6HJPnAwI",
  authDomain: "ecommerce-auth-5a529.firebaseapp.com",
  projectId: "ecommerce-auth-5a529",
  storageBucket: "ecommerce-auth-5a529.appspot.com",
  messagingSenderId: "397148948963",
  appId: "1:397148948963:web:50e97cd7c837a7f20f78d6"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    return await signInWithPopup(auth, provider);
  } catch(error) {
    console.log(error);
  }
}
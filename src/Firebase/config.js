import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA097euLDqADerj1t7ROvGJo509f24IcS4",
  authDomain: "portfolio-ec127.firebaseapp.com",
  projectId: "portfolio-ec127",
  storageBucket: "portfolio-ec127.appspot.com",
  messagingSenderId: "605983461560",
  appId: "1:605983461560:web:dd37c4724d6db27580644d",
  measurementId: "G-2XVFNJPNQM",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const storage = firebase.storage();

export { auth, provider, storage };
export default db;

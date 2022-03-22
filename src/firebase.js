// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB3r14X6dC4QYGvrYN7hVrLgNZNliK9ruQ",
  authDomain: "premium-client-337312.firebaseapp.com",
  projectId: "premium-client-337312",
  storageBucket: "premium-client-337312.appspot.com",
  messagingSenderId: "682900347584",
  appId: "1:682900347584:web:78c07b2587d09f59b82b25",
  measurementId: "G-HZCKMLS574",
};

firebase.initializeApp(firebaseConfig);
// Initialize Firebase
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, googleAuthProvider, storage };

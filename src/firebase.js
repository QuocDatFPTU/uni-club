// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA-Qv5VLEiQB1wUAGdcefVgPd8el22dke0",
  authDomain: "uniclub-4de60.firebaseapp.com",
  projectId: "uniclub-4de60",
  storageBucket: "uniclub-4de60.appspot.com",
  messagingSenderId: "826733271188",
  appId: "1:826733271188:web:e6ae2893da94f35537fc81",
};

firebase.initializeApp(firebaseConfig);
// Initialize Firebase
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleAuthProvider };

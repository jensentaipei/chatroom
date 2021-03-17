import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyCjCeLn-SmIs_bMsxrb0s5AnefoT2gYMc4",
    authDomain: "chatroom-a899a.firebaseapp.com",
    projectId: "chatroom-a899a",
    storageBucket: "chatroom-a899a.appspot.com",
    messagingSenderId: "977885964148",
    appId: "1:977885964148:web:cccbf27e6a6bd358caae21",
    measurementId: "G-BJP0R6YCM1"
  };


// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.firestore().settings({ timestampsInSnapshots: true })
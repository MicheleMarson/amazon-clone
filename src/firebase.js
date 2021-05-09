import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpbdhjvmEnRr7AtwQKQfyvQceYy6idl94",
  authDomain: "clone-21945.firebaseapp.com",
  projectId: "clone-21945",
  storageBucket: "clone-21945.appspot.com",
  messagingSenderId: "191211088686",
  appId: "1:191211088686:web:04a2d8c4d300e562b368bf",
  measurementId: "G-SJ6VNRV6TX"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export {db, auth}
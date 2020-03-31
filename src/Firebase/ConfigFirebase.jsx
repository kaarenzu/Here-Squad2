import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'



// Llave de firebase para poder acceder a la base de datos que tenemos en ella 
const firebaseConfig = {
  apiKey: "AIzaSyCvwm90v8fHTnwZ93dS_A4E4hSsoC_ZIdg",
  authDomain: "here-squad2.firebaseapp.com",
  databaseURL: "https://here-squad2.firebaseio.com",
  projectId: "here-squad2",
  storageBucket: "here-squad2.appspot.com",
  messagingSenderId: "724470415916",
  appId: "1:724470415916:web:61fd2789c7956f54c40789",
  measurementId: "G-R69W7ZSMVV"
};

firebase.initializeApp(firebaseConfig);

 let db= firebase.firestore(); // Conectamos firebase con firestore
  export {db, firebase}
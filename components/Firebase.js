import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBabpGgcSwSA05Q8zAUWIrTmZunj7h3vGs",
  authDomain: "courses-app-8c691.firebaseapp.com",
  projectId: "courses-app-8c691",
  storageBucket: "courses-app-8c691.appspot.com",
  messagingSenderId: "678246414908",
  appId: "1:678246414908:web:c32c322de9e7b36920e139",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { firebase, auth };

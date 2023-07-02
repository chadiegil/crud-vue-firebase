import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFbS0J91do7I17-xgJUe5gD5QOpdBkuxs",
  authDomain: "vue-firebase-job-app.firebaseapp.com",
  projectId: "vue-firebase-job-app",
  storageBucket: "vue-firebase-job-app.appspot.com",
  messagingSenderId: "195889754011",
  appId: "1:195889754011:web:28483811e292bfc5013b3e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { app, db };

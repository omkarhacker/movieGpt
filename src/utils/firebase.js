// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxFSAHvF6keLf4kwdIAf81ygK3LOOrKu8",
  authDomain: "netflix-gpt-f73a5.firebaseapp.com",
  projectId: "netflix-gpt-f73a5",
  storageBucket: "netflix-gpt-f73a5.appspot.com",
  messagingSenderId: "40019995339",
  appId: "1:40019995339:web:dec138991c62418033c94e",
  measurementId: "G-XX15KMXRKC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth();
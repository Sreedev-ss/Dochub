// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkCa3sjjydpJBypBjpAmvcIt_vqrFF8LM",
  authDomain: "hospital-management-e1fee.firebaseapp.com",
  projectId: "hospital-management-e1fee",
  storageBucket: "hospital-management-e1fee.appspot.com",
  messagingSenderId: "1071769808944",
  appId: "1:1071769808944:web:93579c466cb85fef757df5",
  measurementId: "G-4ETWB72HF1"
};

// Initialize Firebase
export const Firebase = initializeApp(firebaseConfig);
export const auth = getAuth(Firebase)
const analytics = getAnalytics(Firebase);
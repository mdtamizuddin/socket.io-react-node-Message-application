// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDVij52r09Kuv9M9Sj0Ma0lmYaJP1zerL8",
    authDomain: "messenger-e2c74.firebaseapp.com",
    projectId: "messenger-e2c74",
    storageBucket: "messenger-e2c74.appspot.com",
    messagingSenderId: "1072960715944",
    appId: "1:1072960715944:web:135802dc720b3fdc86569d",
    measurementId: "G-P9XPFC8N00"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const analytics = getAnalytics(app);

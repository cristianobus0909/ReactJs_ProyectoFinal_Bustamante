
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyB1eVAPHgFwTHb3vb4wWMVdjwyQaaSehy8",
    authDomain: "e-commerce-75afe.firebaseapp.com",
    projectId: "e-commerce-75afe",
    storageBucket: "e-commerce-75afe.appspot.com",
    messagingSenderId: "1079403875041",
    appId: "1:1079403875041:web:dcf9640fc61ed346ad45a0",
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const CONFIG = {
  apiKey: "AIzaSyA1HcOc73FKtkykkM1PS7d4ZmikGX6qXmE",
  authDomain: "kungfu-ee556.firebaseapp.com",
  databaseURL: "https://kungfu-ee556.firebaseio.com",
  projectId: "kungfu-ee556",
  storageBucket: "kungfu-ee556.appspot.com",
  messagingSenderId: "815051091302"
};

export default firebase.initializeApp(CONFIG);
export const db = firebase.firestore();


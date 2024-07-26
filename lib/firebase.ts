// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAr5LqShwjfP_P--v3C2Xv24c4XVu3Wj-E",
  authDomain: "voting-system-app-6b04a.firebaseapp.com",
  projectId: "voting-system-app-6b04a",
  storageBucket: "voting-system-app-6b04a.appspot.com",
  messagingSenderId: "234782653243",
  appId: "1:234782653243:web:6ad2904364df559a6b551e",
  measurementId: "G-NK9M2T9GPH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// // lib/firebase.ts
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";

// // Replace the following with your Firebase project configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAr5LqShwjfP_P--v3C2Xv24c4XVu3Wj-E",
//   authDomain: "voting-system-app-6b04a.firebaseapp.com",
//   projectId: "voting-system-app-6b04a",
//   storageBucket: "voting-system-app-6b04a.appspot.com",
//   messagingSenderId: "234782653243",
//   appId: "1:234782653243:web:6ad2904364df559a6b551e",
//   measurementId: "G-NK9M2T9GPH",
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// const auth = firebase.auth();
// const firestore = firebase.firestore();

// export { auth, firestore };

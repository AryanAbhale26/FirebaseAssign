// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMYrMUexCUOh7KfFavVzPaMsh7nLLmwFg",
  authDomain: "assign-64d23.firebaseapp.com",
  projectId: "assign-64d23",
  storageBucket: "assign-64d23.firebasestorage.app",
  messagingSenderId: "32017643252",
  appId: "1:32017643252:web:c9fe64f9b8626671bb10a1",
  measurementId: "G-2ZWT01D004",
  databaseURL: "https://assign-64d23-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

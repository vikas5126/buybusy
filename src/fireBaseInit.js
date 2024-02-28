// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUE1NRrXqpoE9zdmeg7avIt0HMKxl_H4M",
  authDomain: "buybusy-7ef80.firebaseapp.com",
  projectId: "buybusy-7ef80",
  storageBucket: "buybusy-7ef80.appspot.com",
  messagingSenderId: "48151990708",
  appId: "1:48151990708:web:6f62a7ee962172bb18a2e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app, {
  experimentalForceLongPolling :true,
  useFetchStreams: false,
});

// export const db = getFirestore(app);
export const auth = getAuth(app);

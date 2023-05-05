// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJquLslnx0fr7BpwOOk1WSOVJEKaczKDM",
  authDomain: "dime-dodo.firebaseapp.com",
  projectId: "dime-dodo",
  storageBucket: "dime-dodo.appspot.com",
  messagingSenderId: "598158175117",
  appId: "1:598158175117:web:184e1e77f2b0cb709eabc4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app)
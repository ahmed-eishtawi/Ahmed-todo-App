import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkcOmERvN_kU1y6MNVGDGoNOcNBWkTnJA",
  authDomain: "eishtawi-todo.firebaseapp.com",
  projectId: "eishtawi-todo",
  storageBucket: "eishtawi-todo.appspot.com",
  messagingSenderId: "65708510457",
  appId: "1:65708510457:web:dad657c5710219ae35e628",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth };

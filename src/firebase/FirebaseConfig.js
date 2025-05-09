import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBWbhnyGCUO_4qch-8eRj--2fvHyYrdHbY",
  authDomain: "auth-todo-07.firebaseapp.com",
  projectId: "auth-todo-07",
  storageBucket: "auth-todo-07.firebasestorage.app",
  messagingSenderId: "1002042984176",
  appId: "1:1002042984176:web:dcaf834c02c1812b262435"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "e-commerce-3e604.firebaseapp.com",
  projectId: "e-commerce-3e604",
  storageBucket: "e-commerce-3e604.appspot.com",
  messagingSenderId: "890133540375",
  appId: "1:890133540375:web:cbfaad225e9352e2be7652"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const usersRef = collection(db, "users");

export const productsRef = collection(db, "products");

export const adminRef = collection(db, "admin");

export default app;
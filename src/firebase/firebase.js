import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkROpWFWyaTHF9h5RtJeHOipcrf_jqzs4",
  authDomain: "e-commerce-3e604.firebaseapp.com",
  projectId: "e-commerce-3e604",
  storageBucket: "e-commerce-3e604.appspot.com",
  messagingSenderId: "890133540375",
  appId: "1:890133540375:web:cbfaad225e9352e2be7652"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const usersRef = collection(db, "users");

export default app;
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6SusDmfIUjJbGw6RVXHk4rpd3zOZpLbQ",
  authDomain: "meuprimeirofirebase-4fd67.firebaseapp.com",
  projectId: "meuprimeirofirebase-4fd67",
  storageBucket: "meuprimeirofirebase-4fd67.firebasestorage.app",
  messagingSenderId: "112086858573",
  appId: "1:112086858573:web:c1e543753d311b46395504"
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();



const db = getFirestore(app);

export { db };
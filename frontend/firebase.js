
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vertex-ai-cf7e4.firebaseapp.com",
  projectId: "vertex-ai-cf7e4",
  storageBucket: "vertex-ai-cf7e4.firebasestorage.app",
  messagingSenderId: "201784129065",
  appId: "1:201784129065:web:f18a9a77c354d54cc78e38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
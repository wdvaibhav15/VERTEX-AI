import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, googleProvider } from "../firebase";
import { login } from "./apiCalls/LoginApi";

const App = () => {
  const handleGoogleLogin = async () => {
    try {
      // Firebase Google Authentication
      const result = await signInWithPopup(auth, googleProvider);

      // Get Firebase ID Token
      const token = await result.user.getIdToken();

      // Send token to backend
      const data = await login(token);

      console.log("Backend Response:", data);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="bg-amber-600 text-black ml-5 mt-5 rounded-xl border-2 cursor-pointer hover:bg-amber-400"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default App;
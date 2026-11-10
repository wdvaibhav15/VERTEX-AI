import React,{ useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { login } from "../apiCalls/LoginApi";

const Dashboard = () => {
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      // Firebase Google Authentication
      const result = await signInWithPopup(auth, googleProvider);
      // Get Firebase ID Token
      const token = await result.user.getIdToken();
      // Send token to backend
      const data = await login(token);
      setLoading(false);
      console.log("Backend Response:", data);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-50 px-4 transition-colors duration-300 dark:bg-[#07070c]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.05] blur-[120px] dark:black" />

      {/* Main Card */}
      <div className="relative w-full max-w-sm rounded-2xl border border-slate-200/70 bg-white/80 p-8 text-center shadow-xl shadow-slate-200/50 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.03] dark:shadow-black/40">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-lg shadow-black/5 dark:border-transparent">
          <span className="text-lg font-bold text-slate-900">AI</span>
        </div>

        <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
          Welcome to Vertex-AI
        </h2>
        <p className="mb-6 text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">
          Sign in to access your projects and continue building with Vertex-AI
        </p>
        <button 
        onClick={handleGoogleLogin}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10">
          <FcGoogle size={20} />
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>
        <p className="mt-5 text-[13px] text-slate-500 dark:text-slate-600">
          by continuing you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

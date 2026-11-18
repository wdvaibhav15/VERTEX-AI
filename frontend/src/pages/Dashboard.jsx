
import React, { useEffect, useState } from "react";
import { FcElectricalSensor, FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { login } from "../apiCalls/LoginApi";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import Navbar from "../components/Navbar.jsx";
import SideBar from "../components/Sidebar.jsx";
import { FaFolderPlus } from "react-icons/fa6";
import { setProjects } from "../redux/projectSlice.js";
import { getProjects, getStarredProjects } from "../apiCalls/project.Api.js";
import { Folder, Loader2 } from "lucide-react";
import ProjectCard from "../components/ProjectCard.jsx";
import CreateProjectModel from "../components/CreateProjectModel.jsx";
const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Get user data from Redux
  const userData = useSelector(
    (state) => state.user?.userData
  );
  // get projects from redux
  const projects = useSelector(
    (state) => state.project?.projects
  );
  const allStarredProjects = useSelector(
    (state) => state.project?.Projects
  );

  // Support both nested and direct user responses
  const user = userData?.user ?? userData;

  const [activeSession, setActiveSession] = useState("projects");
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  // Google Login
  const handleGoogleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);

      // Firebase Google Authentication
      const result = await signInWithPopup(auth, googleProvider);

      // Get Firebase ID Token
      const token = await result.user.getIdToken();

      // Send token to backend
      const data = await login(token);

      // Save user data in Redux
      dispatch(setUserData(data));

      console.log("Backend Response:", data);
    } catch (error) {
      console.error("Google Login Error:", error);

    } finally {
      setLoading(false);
    }
  };
const fetchAllProjects = async () => {
  try {
    setLoadingProjects(true);

    const data = await getProjects();

    dispatch(setProjects(data.projects || []));
  } catch (error) {
    console.error("Fetch Projects Error:", error);
  } finally {
    setLoadingProjects(false);
  }
};

const starredProjects = async () => {
  try {
    setLoadingProjects(true);

    const data = await getStarredProjects();

    dispatch(setProjects(data.projects || []));
  } catch (error) {
    console.error("Fetch Starred Projects Error:", error);
  } finally {
    setLoadingProjects(false);
  }
};
  

  useEffect(() => {
    if(activeSession === "projects") {
      fetchAllProjects();
    }else{
      starredProjects();
      }
  }, [activeSession]);

  // Login Screen
  if (!user) {
    return (
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-50 px-4 transition-colors duration-300 dark:bg-[#07070c]">

        {/* Background Glow */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-slate-300/20 blur-[120px] dark:bg-white/[0.04]" />

        {/* Main Card */}
        <div className="relative w-full max-w-sm rounded-2xl border border-slate-200/70 bg-white/80 p-8 text-center shadow-xl shadow-slate-200/50 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.03] dark:shadow-black/40">

          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-lg shadow-black/5 dark:border-white/10 dark:bg-white/5">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              AI
            </span>
          </div>

          <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
            Welcome to Vertex-AI
          </h2>

          <p className="mb-6 text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">
            Sign in to access your projects and continue building with Vertex-AI.
          </p>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/10"
          >
            <FcGoogle size={20} />

            {loading ? "Signing in..." : "Sign in with Google"}
          </button>

          <p className="mt-5 text-[13px] text-slate-500 dark:text-slate-600">
            By continuing, you agree to our Terms & Privacy Policy.
          </p>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-slate-50 transition-colors duration-300 dark:bg-[#07070c]">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/3 hidden h-[700px] w-[700px] rounded-full bg-white/[0.04] blur-[140px] dark:block" />

      <div className="pointer-events-none absolute right-0 top-1/3 hidden h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-[130px] dark:block" />

      <div className="relative flex min-h-0 flex-1 flex-col">

        {/* Navbar */}
        <Navbar />

        <div className="flex min-h-0 flex-1">

          {/* Sidebar */}
          <SideBar
            activeSession={activeSession}
            setActiveSession={setActiveSession}
          />

          {/* Main Content */}
          <div
            className="min-h-0 flex-1 overflow-y-auto px-8 py-8 [scrollbar-width:thin] [scrollbar-color:rgba(100,116,139,0.35)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-clip-padding hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 dark:[&::-webkit-scrollbar-thumb]:bg-white/10 dark:hover:[&::-webkit-scrollbar-thumb]:bg-white/20"
          >

            {/* Welcome Section */}
            <div className="mb-8 flex items-start justify-between">
              <div>
                <h1 className="flex items-center gap-2 text-[26px] font-bold text-slate-900 dark:text-white">
                  Welcome back,{" "}
                  {user?.name?.trim()?.split(/\s+/)[0] || "Guest"}
                  <span>👋🏻</span>
                </h1>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Manage your projects and continue building.
                </p>
              </div>
              <button 
              onClick={() => setOpenModel(true)}
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-sm transition-opacity duration-150 hover:opacity-90 dark:bg-white dark:text-slate-900">
                <FaFolderPlus size={18} /> 
                New Project
              </button>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[16px] font-semibold text-slate-900 dark:text-white">
                {activeSession === "starred" ? " Starred Projects" : "Recent Projects"}
              </h2>
            </div>

            { loadingProjects ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <Loader2 size={28} className="animate-spin text-slate-400 dark:text-slate-500" />
              </div>
            ) : projects.length === 0 ? (
              <div className="mb-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/40 py-16 text-center dark:border-white/[0.1] dark:bg-white/[0.01]">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900/5 dark:bg-white/10">
                  <Folder size={48}  className="text-slate-500 dark:text-white" />
                </div>
                <h3 className="mb-1.5 text-[16px] font-semibold text-slate-900 dark:text-white">{activeSession == "starred" ? "No Starred Projects" : "No Recent Projects"}</h3>
                <p className="mb-5 max-w-xs text-[13px] text-slate-500 dark:text-slate-500 ">{activeSession == "starred" ? "You don't have any starred projects yet." : "Create your first project and start building something amazing."}</p>
              </div>
            ) : (
              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {projects.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </div>
            )
            }

          </div>
        </div>
      </div>
      {openModel && (
        <CreateProjectModel open ={openModel} onClose={() => setOpenModel(false)}/>
      )}
      
    </div>
  );
};

export default Dashboard;

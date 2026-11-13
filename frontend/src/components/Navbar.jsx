import React, { useEffect, useState } from "react";
import { FiMoon } from "react-icons/fi";
import { IoIosSunny } from "react-icons/io";
import { useSelector } from "react-redux";
function NavBar() {
  const [isDark, setIsDark] = useState(true);
  const userData = useSelector((state) => state.user);
  const name = userData?.name || "Guest";
  const initials = name
  .trim()
  .split(/\s+/)
  .map((word) => word[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

  useEffect(() => {
    if (typeof window !== "undefined") return;
    const theme = window.localStorage.getItem("theme");
    const dark = theme ? theme === "dark" : true;
    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <div className="w-full h-16 bg-slate-100 dark:bg-white/[0.03] backdrop-blur-xl border-b border-slate-200/70 dark:border-white/[0.07] flex items-center justify-between px-6 gap-5 font-sans transition-colors duration-300">
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-slate-900 dark:text-white font-bold text-[17px] tracking-tight">
          VertexAI
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={toggleTheme}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors duration-150"
        >
          {isDark ? (
            <FiMoon className="w-5 h-5" />
          ) : (
            <IoIosSunny className="w-5 h-5" />
          )}
        </button>

        <div className="relative ml-1">
          <button className="flex items-center gap-2 pl-1.5 pr-2 h-10 rounded-lg hover:bg-slate-200 dark:hover:bg-white/[0.06] transition-colors duration-150">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-700 dark:to-white flex items-center justify-center overflow-hidden ring-1 ring-black/5 dark:ring-white/20">
              <span className="text-[12px] font-semibold text-white dark:text-slate-900">
                {initials}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;

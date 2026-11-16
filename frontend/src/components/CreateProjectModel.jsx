import React from "react";
import { motion } from "motion/react";

function CreateProjectModal({ openModal, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-black/60"
      />

      <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98}}
      animate={{ opacity: 1, y: 0, scale: 1}}
      exit={{ opacity: 0, y: 10, scale: 0.98}}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-black/[0.08] 
      bg-white/70 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] backdrop-blur-2xl dark:border-white/[0.1] 
      dark:bg-white/[0.05] dark:shadow-[0_20px_70px_-15px_rgba(0,0,0,0.7)]"
      >
        <div className="pointer-events-none absolute inser-x-0 top-0 h-px bg-gredient-to-r from-transparent via-white/80 to-transparent dark:via-white/30"/>
        <div className="flex item-center justify-between border-b border-black/[0.06] px-7 py-6 dark:border-white/[0.08]">
            <div>
                <h2 classname="text-[17px] font-semibold tracking-tight text-zink-900 dark:text-white" >Create Project</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400" >Set up a new workspace in seconds</p>
            </div>
            <button>

            </button>
        </div>
      </motion.div>

    <div className="pointer-event-none absolute -z-10 h-[460px] w-[460px] rounded-full bg-sky-300/20 blue-[130px] dark:bg-sky-500/8"/>
    </div>
  );
}

export default CreateProjectModal;
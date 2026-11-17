import React from 'react'
import { motion } from 'motion/react'
const ProjectCard = ({ project }) => {
  return (
    <motion.div
    initial={{ opacity: 0 , y: 8 }}
    animate={{ opacity: 1 , y: 0 }}
    exit={{ opacity: 0 , y: 0.97 }}
    whileHover={{ y: -3 }}
    transition={{ duration: 0.18, ease: "easeOut" }}
    className="group relative cursor-pointer rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] dark:border-white/[0.07] dark:bg-white/[0.03] dark:shadow-none dark:hover:border-white/[0.14] dark:hover:bg-white/[0.045]"
    >
      
    </motion.div>
  )
}

export default ProjectCard

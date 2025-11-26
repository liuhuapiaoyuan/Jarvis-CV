"use client"
import { motion } from "framer-motion";
export const SocialLinks = ({className}: {className: string}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`absolute  flex gap-6 pointer-events-auto z-50 ${className}`}
    >
       
    </motion.div>
  );
};
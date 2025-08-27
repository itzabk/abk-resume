import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ show=false, message='Email copied!' }){
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          exit={{ opacity:0, y:20 }}
          transition={{ duration:0.25 }}
          style={{ position:'fixed', right:16, bottom:16, zIndex:80 }}
        >
          <div className="glass px-4 py-3 rounded-lg shadow-xl text-sm flex items-center gap-2">
            <span>✅</span><span>{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

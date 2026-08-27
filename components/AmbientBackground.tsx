"use client";

import { motion } from "framer-motion";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Deep Base */}
      <div className="absolute inset-0 bg-[#020617]" />
      
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6562' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Ambient Blobs */}
      <motion.div 
        animate={{ 
          x: [0, 100, -50, 0], 
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.9, 1] 
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[120px] bg-violet-600/20"
      />
      <motion.div 
        animate={{ 
          x: [0, -100, 50, 0], 
          y: [0, 100, -50, 0],
          scale: [1, 0.9, 1.1, 1] 
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px] bg-cyan-500/10"
      />
      <motion.div 
        animate={{ 
          x: [0, 50, -100, 0], 
          y: [0, 50, -50, 0],
          scale: [1, 1.1, 0.8, 1] 
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] rounded-full blur-[120px] bg-indigo-600/10"
      />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Download, GitBranch, Briefcase, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-start px-6 md:px-12 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-1/3 h-1/2 glass-surface rounded-full blur-3xl opacity-20 -z-10" />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Typography Composition */}
        <div className="lg:col-span-7 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-12 bg-violet-500" />
              <span className="text-engineer">Software Engineer / KSU</span>
            </div>

            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] text-right lg:text-left">
              <span className="block text-white">فارس</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                مهندس برمجيات
              </span>
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-slate-400 max-w-2xl leading-relaxed text-right lg:text-left font-light"
            >
              أبني منتجات رقمية تجمع بين الهندسة، التجربة، والإبداع.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start pt-4"
            >
              <a 
                href={siteConfig.resumeUrl} 
                download 
                className="group relative px-8 py-4 rounded-full bg-white text-black font-bold overflow-hidden transition-transform hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  تحميل السيرة الذاتية
                </span>
              </a>
              
              <div className="flex gap-3">
                {[
                  { icon: GitBranch, href: siteConfig.links.github },
                  { icon: Briefcase, href: siteConfig.links.linkedin },
                  { icon: Mail, href: `mailto:${siteConfig.links.email}` },
                ].map(({ icon: Icon, href }, i) => (
                  <a 
                    key={i} 
                    href={href} 
                    className="p-4 rounded-full glass-surface hover:bg-white/10 transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side: Floating Glass Elements */}
        <div className="lg:col-span-5 relative h-[400px] md:h-[600px] flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full max-w-md aspect-square glass-surface rounded-3xl p-8 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="text-engineer">System.Status: Optimal</div>
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            
            <div className="space-y-4">
              <div className="h-2 w-3/4 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: "70%" }} 
                  transition={{ delay: 1, duration: 1.5 }}
                  className="h-full bg-violet-500" 
                />
              </div>
              <div className="h-2 w-1/2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: "40%" }} 
                  transition={{ delay: 1.2, duration: 1.5 }}
                  className="h-full bg-cyan-500" 
                />
              </div>
              <div className="h-2 w-2/3 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: "90%" }} 
                  transition={{ delay: 1.4, duration: 1.5 }}
                  className="h-full bg-indigo-500" 
                />
              </div>
            </div>

            <div className="text-right">
              <span className="text-engineer">Core_Identity_v1.0</span>
            </div>
          </motion.div>

          {/* Floating Metadata Labels */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-10 p-3 glass-surface rounded-xl text-xs font-mono"
          >
            RIYADH / SAUDI ARABIA
          </motion.div>
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 left-0 p-3 glass-surface rounded-xl text-xs font-mono"
          >
            KSU SOFTWARE ENGINEERING
          </motion.div>
        </div>
      </div>
    </section>
  );
}

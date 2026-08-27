"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  featured?: boolean;
  index: number;
}

export function FeaturedProject({ project }: { project: Project }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative w-full lg:col-span-8 rounded-3xl overflow-hidden glass-surface"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        <div className="p-8 md:p-12 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-engineer">Project 0{project.index}</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
              {project.title}
            </h3>
            
            <p className="text-lg text-slate-400 leading-relaxed max-w-md">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-12">
            <a 
              href="#" 
              className="group/btn flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold transition-all hover:scale-105 active:scale-95"
            >
              <span>عرض المشروع</span>
              <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="relative h-full min-h-[300px] bg-gradient-to-br from-violet-600/20 to-cyan-500/20 overflow-hidden group-hover:scale-105 transition-transform duration-700">
          {/* Abstract UI Visualization */}
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="w-full h-full glass-surface rounded-2xl p-6 space-y-4 transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <div className="flex justify-between items-center gap-4">
                <div className="h-4 w-1/3 bg-white/20 rounded-full" />
                <div className="h-4 w-4 bg-violet-500 rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-white/10 rounded-full" />
                <div className="h-3 w-5/6 bg-white/10 rounded-full" />
                <div className="h-3 w-4/6 bg-white/10 rounded-full" />
              </div>
              <div className="grid grid-cols-3 gap-2 pt-4">
                <div className="h-12 bg-white/5 rounded-lg border border-white/10" />
                <div className="h-12 bg-white/5 rounded-lg border border-white/10" />
                <div className="h-12 bg-white/5 rounded-lg border border-white/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative p-8 rounded-3xl glass-surface hover:bg-white/10 transition-all duration-500"
    >
      <div className="flex flex-col h-full justify-between gap-8">
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-engineer">Project 0{project.index}</span>
            <div className="w-8 h-8 rounded-full glass-surface flex items-center justify-center group-hover:rotate-45 transition-transform">
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-violet-400 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-slate-400 leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span key={t} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400 uppercase">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

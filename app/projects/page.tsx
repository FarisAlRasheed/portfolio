"use client";

import { motion } from "framer-motion";
import { Code, ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
}

const projects: Project[] = [
  {
    title: "نظام إدارة المهام",
    description: "منصة متكاملة لإدارة المشاريع والمهام البرمجية مع نظام تتبع دقيق.",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    link: "https://github.com/example",
  },
  {
    title: "تطبيق ثراء التقني",
    description: "تطوير البنية التحتية الرقمية لمبادرة ثراء لتحسين تجربة المستخدم.",
    tech: ["React", "Tailwind CSS", "Firebase"],
    link: "https://github.com/example",
  },
  {
    title: "منصة تحليل البيانات",
    description: "أداة لتحليل البيانات الضخمة وعرضها بشكل بصري تفاعلي.",
    tech: ["Python", "Next.js", "D3.js"],
    link: "https://github.com/example",
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-8 pt-4 md:pt-0 px-6 md:px-12 max-w-7xl mx-auto py-16">
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="h-px w-12 bg-violet-500" />
          <span className="text-engineer">Selected Work</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">مشاريعي</h1>
        <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
          مجموعة من الأعمال التي تعكس مهاراتي في هندسة البرمجيات.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-8 rounded-3xl glass-surface hover:bg-white/10 transition-all duration-500"
          >
            <div className="flex flex-col h-full justify-between gap-8">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-2xl bg-violet-500/15 text-violet-400 group-hover:scale-110 transition-transform">
                    <Code className="w-6 h-6" />
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    className="p-2 rounded-full glass-surface text-slate-400 group-hover:text-white group-hover:rotate-45 transition-all"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-5">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

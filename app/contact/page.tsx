"use client";

import { motion } from "framer-motion";
import { Mail, GitBranch, Briefcase, MapPin, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-8 pt-4 md:pt-0 px-6 md:px-12 max-w-7xl mx-auto py-16">
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="h-px w-12 bg-violet-500" />
          <span className="text-engineer">Get In Touch</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">تواصل معي</h1>
        <p className="text-slate-400 text-lg max-w-xl leading-relaxed">أنا متاح حالياً للمشاريع والفرص المهنية.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl glass-surface flex flex-col gap-6"
        >
          <h3 className="text-xl font-bold text-white">معلومات التواصل</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all group">
              <div className="p-2.5 rounded-xl bg-violet-500/15 text-violet-400 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <a href={`mailto:${siteConfig.links.email}`} className="font-medium text-slate-200 hover:text-violet-400 transition-all">
                {siteConfig.links.email}
              </a>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all group">
              <div className="p-2.5 rounded-xl bg-violet-500/15 text-violet-400 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="font-medium text-slate-200">الرياض، المملكة العربية السعودية</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-3xl glass-surface flex flex-col gap-6"
        >
          <h3 className="text-xl font-bold text-white">روابط سريعة</h3>
          <div className="flex flex-col gap-3">
            <a
              href={siteConfig.links.github}
              target="_blank"
              className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
            >
              <span className="font-medium text-slate-200 group-hover:text-white">GitHub</span>
              <GitBranch className="w-5 h-5 text-slate-400 group-hover:text-white" />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
            >
              <span className="font-medium text-slate-200 group-hover:text-white">LinkedIn</span>
              <Briefcase className="w-5 h-5 text-slate-400 group-hover:text-white" />
            </a>
            <a
              href={siteConfig.resumeUrl}
              download
              className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
            >
              <span className="font-medium text-slate-200 group-hover:text-white">السيرة الذاتية</span>
              <FileText className="w-5 h-5 text-slate-400 group-hover:text-white" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

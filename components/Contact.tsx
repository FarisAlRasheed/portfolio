"use client";

import { motion } from "framer-motion";
import { Mail, GitBranch, Briefcase, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Contact() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto text-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative"
      >
        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-tight">
          لنبنِ شيئًا <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
            يستحق أن يُرى.
          </span>
        </h2>

        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: Mail, href: `mailto:${siteConfig.links.email}`, label: "البريد الإلكتروني" },
              { icon: GitBranch, href: siteConfig.links.github, label: "GitHub" },
              { icon: Briefcase, href: siteConfig.links.linkedin, label: "LinkedIn" },
              { icon: FileText, href: siteConfig.resumeUrl, label: "السيرة الذاتية" },
            ].map((link, i) => (
              <a 
                key={i} 
                href={link.href} 
                className="flex items-center gap-3 px-6 py-3 rounded-full glass-surface hover:bg-white/10 transition-all duration-300 group"
              >
                <link.icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
          
          <div className="text-engineer opacity-40 pt-12">
            © {new Date().getFullYear()} {siteConfig.name} — All Rights Reserved
          </div>
        </div>
      </motion.div>
    </section>
  );
}

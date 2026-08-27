"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users } from "lucide-react";

const experience = [
  {
    role: "قائد اللجنة التقنية",
    org: "مبادرة ثراء",
    period: "2023 - الحالي",
    description: "قيادة الفريق التقني في تطوير الحلول الرقمية للمبادرة، إدارة المشاريع البرمجية، وتوجيه المطورين لتحقيق أهداف استراتيجية.",
    icon: Users,
    type: "leadership"
  },
  {
    role: "بكالوريوس هندسة البرمجيات",
    org: "جامعة الملك سعود",
    period: "2021 - الحالي",
    description: "دراسة متعمقة في هندسة البرمجيات، خوارزميات متقدمة، وتصميم النظم الموزعة.",
    icon: GraduationCap,
    type: "education"
  }
];

export default function Experience() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-16">
        <span className="text-engineer">Journey & Expertise</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {experience.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative p-8 rounded-3xl glass-surface hover:bg-white/10 transition-all duration-500"
          >
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-violet-500/20 text-violet-400 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-2xl font-bold text-white">{item.role}</h3>
                  <span className="text-xs font-mono text-slate-500">{item.period}</span>
                </div>
                <p className="text-lg font-medium text-slate-300">{item.org}</p>
                <p className="text-slate-400 leading-relaxed pt-4">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

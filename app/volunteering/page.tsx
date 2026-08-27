"use client";

import { motion } from "framer-motion";
import { Award, Users, Zap, Target } from "lucide-react";

export default function VolunteeringPage() {
  return (
    <div className="flex flex-col gap-8 pt-4 md:pt-0 px-6 md:px-12 max-w-7xl mx-auto py-16">
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="h-px w-12 bg-violet-500" />
          <span className="text-engineer">Leadership & Community</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">التطوع والقيادة</h1>
        <p className="text-slate-400 text-lg max-w-xl leading-relaxed">مساهماتي في المجتمع التقني والقيادي.</p>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative p-8 md:p-12 rounded-3xl glass-surface overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-violet-500 to-cyan-400" />

        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-5">
            <div className="p-4 rounded-2xl bg-violet-500/15 text-violet-400">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">مبادرة ثراء</h2>
              <p className="text-violet-400 font-medium mt-1">قائد اللجنة التقنية</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:bg-white/10 transition-all duration-300">
              <Users className="w-6 h-6 text-violet-400" />
              <h4 className="font-bold text-white">إدارة الفرق</h4>
              <p className="text-sm text-slate-400 leading-relaxed">قيادة وتوجيه المطورين في اللجنة لتحقيق أهداف المبادرة.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:bg-white/10 transition-all duration-300">
              <Zap className="w-6 h-6 text-cyan-400" />
              <h4 className="font-bold text-white">التطوير التقني</h4>
              <p className="text-sm text-slate-400 leading-relaxed">الإشراف على بناء الأدوات الرقمية التي تخدم المبادرة.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:bg-white/10 transition-all duration-300">
              <Target className="w-6 h-6 text-violet-400" />
              <h4 className="font-bold text-white">التخطيط الاستراتيجي</h4>
              <p className="text-sm text-slate-400 leading-relaxed">وضع خارطة الطريق التقنية لضمان استدامة المبادرة.</p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { House, Folder, Heart, Mail } from "lucide-react";

const navItems = [
  { name: "الرئيسية", href: "/", icon: House },
  { name: "المشاريع", href: "/projects", icon: Folder },
  { name: "التطوع", href: "/volunteering", icon: Heart },
  { name: "التواصل", href: "/contact", icon: Mail },
];

export default function GlassDock() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-surface px-4 py-3 rounded-full flex items-center gap-2"
      >
        {navItems.map((item) => (
          <a 
            key={item.href} 
            href={item.href}
            className="group relative px-4 py-2 rounded-full transition-all duration-300 hover:text-white text-slate-400"
          >
            <div className="flex items-center gap-2">
              <item.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium hidden md:block">{item.name}</span>
            </div>
            
            {/* Active state simulation - in a real app, use usePathname() */}
            {item.href === "/" && (
              <motion.div 
                layoutId="activeNav"
                className="absolute inset-0 bg-violet-600/30 border border-violet-400/30 rounded-full -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </a>
        ))}
      </motion.nav>
    </div>
  );
}

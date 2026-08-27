
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Folder, Heart, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "الرئيسية", href: "/", icon: House },
  { name: "المشاريع", href: "/projects", icon: Folder },
  { name: "التطوع", href: "/volunteering", icon: Heart },
  { name: "التواصل", href: "/contact", icon: Mail },
];

export default function AppNavigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-nav px-6 py-3 flex justify-around items-center safe-area-bottom">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 transition-colors duration-300",
                isActive ? "text-blue-600" : "text-slate-500"
              )}
            >
              <item.icon className={cn("w-6 h-6", isActive && "scale-110")} />
              <span className="text-xs font-medium">{item.name}</span>
              {isActive && (
                <motion.div 
                  layoutId="nav-indicator" 
                  className="absolute -top-1 w-8 h-1 bg-blue-600 rounded-full" 
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Desktop Sidebar Nav */}
      <aside className="fixed right-0 top-0 h-full w-64 hidden md:flex flex-col glass-card m-4 rounded-2xl p-6 z-50">
        <div className="mb-10 flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            ف
          </div>
          <h1 className="text-xl font-bold mt-2">فارس</h1>
          <p className="text-xs text-slate-500 text-center px-2">طالب هندسة برمجيات</p>
        </div>
        
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                  isActive 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                    : "text-slate-600 hover:bg-white/50 hover:text-slate-900"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

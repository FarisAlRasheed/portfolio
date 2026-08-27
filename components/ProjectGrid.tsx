"use client";

import { FeaturedProject, ProjectCard } from "@/components/Projects";

const projects = [
  {
    title: "نظام إدارة المهام",
    description: "منصة متكاملة لإدارة المشاريع والمهام البرمجية مع نظام تتبع دقيق يهدف إلى تحسين الإنتاجية وتنسيق العمل بين الفرق التقنية.",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    index: 1,
    featured: true,
  },
  {
    title: "تطبيق ثراء التقني",
    description: "تطوير البنية التحتية الرقمية لمبادرة ثراء لتحسين تجربة المستخدم وتسهيل الوصول إلى الموارد التقنية.",
    tech: ["React", "Tailwind CSS", "Firebase"],
    index: 2,
  },
  {
    title: "منصة تحليل البيانات",
    description: "أداة متقدمة لتحليل البيانات الضخمة وعرضها بشكل بصري تفاعلي لدعم اتخاذ القرارات المبنية على البيانات.",
    tech: ["Python", "D3.js", "React"],
    index: 3,
  },
];

export default function ProjectGrid() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-16">
        <span className="text-engineer">Selected Work</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => {
          if (project.featured) {
            return <FeaturedProject key={i} project={project} />;
          }
          return <ProjectCard key={i} project={project} />;
        })}
      </div>
    </section>
  );
}

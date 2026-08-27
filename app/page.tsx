import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <Hero />
      <ProjectGrid />
      <Experience />
      <Contact />
    </main>
  );
}

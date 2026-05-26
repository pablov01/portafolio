import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Section from "@/components/sections/Section";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <main className="flex flex-col gap-20 py-16">
      
      <section className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">
          Pablo Villalba
        </h1>

        <p className="text-neutral-400 text-lg">
          Backend & DevOps Developer focused on scalable systems, automation and clean architecture.
        </p>
      </section>

      <About />

      <Projects />

      <Skills />

      <Experience />

      <Contact />

    </main>
  );
}
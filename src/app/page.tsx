import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <main id="main-content" className="flex flex-col gap-20 py-12 sm:py-16">
      <section className="flex flex-col gap-6" aria-labelledby="intro-title">
        <nav aria-label="Main navigation" className="flex flex-wrap gap-5 text-sm text-neutral-400">
          <a className="transition-colors hover:text-white focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400" href="#projects">Projects</a>
          <a className="transition-colors hover:text-white focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400" href="#experience">Experience</a>
          <a className="transition-colors hover:text-white focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400" href="#contact">Contact</a>
        </nav>

        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">Backend / DevOps</p>
        <h1 id="intro-title" className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Pablo Villalba
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed text-neutral-400 sm:text-xl">
          I build reliable backend systems, automation workflows, and tools that hold up in real environments.
        </p>

        <div className="flex flex-wrap gap-3">
          <a href="#projects" className="rounded-md bg-cyan-400 px-4 py-2 font-medium text-black transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
            View projects
          </a>
          <a href="#contact" className="rounded-md border border-neutral-700 px-4 py-2 font-medium text-white transition-colors hover:border-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400">
            Get in touch
          </a>
        </div>
      </section>

      <About />

      <Projects />

      <Skills />

      <Experience />

      <Contact />

    </main>
  );
}
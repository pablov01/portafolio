import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <main id="main-content" className="flex flex-col gap-20 py-12 sm:py-16">
      <section className="grid min-h-[75vh] items-center gap-8 py-8 md:grid-cols-[1.2fr_0.8fr]" aria-labelledby="intro-title">
        <div className="flex flex-col gap-6">
          <nav aria-label="Main navigation" className="flex flex-wrap gap-5 text-sm text-neutral-400">
            <a className="transition-colors hover:text-white focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400" href="#projects">Projects</a>
            <a className="transition-colors hover:text-white focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400" href="#experience">Experience</a>
            <a className="transition-colors hover:text-white focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400" href="#contact">Contact</a>
          </nav>

          <div className="glass-strong inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-widest text-cyan-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            Available for new projects
          </div>

          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">Backend / DevOps</p>
          <h1 id="intro-title" className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Pablo Villalba
            <span className="block bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400 bg-clip-text text-transparent">Builds systems that scale</span>
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-neutral-300 sm:text-xl">
            I build reliable backend systems, automation workflows, and tools that hold up in real environments — now with immersive 3D.
          </p>
          <p className="max-w-2xl text-sm text-neutral-500">Arrastra para orbitar • Scroll mueve la cámara • Hover en cards 3D</p>

          <div className="flex flex-wrap gap-3">
            <a href="#projects" className="rounded-md bg-cyan-400 px-5 py-2.5 font-medium text-black transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
              View projects
            </a>
            <a href="#contact" className="glass rounded-md px-5 py-2.5 font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400">
              Get in touch
            </a>
          </div>
        </div>
        {/* Spacer para dejar ver el TorusKnot 3D a la derecha en desktop */}
        <div className="hidden min-h-[400px] md:block" aria-hidden="true" />
      </section>

      <About />

      <Projects />

      <Skills />

      <Experience />

      <Contact />

    </main>
  );
}
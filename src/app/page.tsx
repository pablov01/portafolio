import Projects from "@/components/sections/Projects";
import Section from "@/components/sections/Section";

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

      <Section title="About">
        I build backend systems, APIs and automation workflows. 
        {/* I enjoy working with scalable architectures and modern DevOps practices. */}
      </Section>

      <Projects />

    </main>
  );
}
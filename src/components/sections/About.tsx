export default function About() {
    return (
        <section className="flex max-w-3xl flex-col gap-6" aria-labelledby="about-title">
        
        <h2 id="about-title" className="mb-2 text-2xl font-semibold text-white">
            About Me
        </h2>

        <div className="w-12 h-0.5 bg-neutral-700 mb-6"/>

        <p className="text-neutral-400 leading-relaxed">
            I’m a software developer who enjoys building systems that actually work in real environments.
        </p>

        <p className="text-neutral-400 leading-relaxed">
            I like turning ideas into clean, functional, and scalable applications, focusing mainly on backend development and system architecture.
        </p>

        <p className="text-neutral-400 leading-relaxed">
            I’m constantly learning and improving how I design and structure software, especially in areas like performance, scalability, and DevOps.
        </p>

        <p className="text-neutral-400 leading-relaxed">
            Outside of coding, I enjoy exploring new technologies and understanding how complex systems are built.
        </p>

        </section>
    );
}
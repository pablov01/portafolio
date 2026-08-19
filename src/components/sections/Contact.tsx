export default function Contact() {
    return (
        <section id="contact" className="flex max-w-3xl flex-col gap-8" aria-labelledby="contact-title">

        <div className="flex flex-col gap-3">

            <h2 id="contact-title" className="text-2xl font-semibold text-white">
            Contact
            </h2>

            <p className="text-neutral-400 leading-relaxed">
            I’m always interested in new opportunities, collaborations,
            and interesting technical projects.
            </p>

            <p className="text-neutral-400 leading-relaxed">
            Whether it’s backend development, full-stack applications,
            DevOps workflows, or scalable systems — feel free to reach out.
            </p>

        </div>

        <div className="grid gap-4">

            {/* GitHub */}
            <a
            href="https://github.com/pablov01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Pablo Villalba on GitHub, opens in a new tab"
            className="
                border border-neutral-800
                rounded-xl
                p-4
                hover:border-neutral-600
                motion-safe:transition-colors
                focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400
                bg-neutral-950
            "
            >
            <p className="mb-1 text-sm font-medium text-neutral-300">
                GitHub
            </p>

            <p className="text-white">
                github.com/pablov01
            </p>
            </a>

            {/* LinkedIn */}
            <a
            href="https://linkedin.com/in/pablov01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Pablo Villalba on LinkedIn, opens in a new tab"
            className="
                border border-neutral-800
                rounded-xl
                p-4
                hover:border-neutral-600
                motion-safe:transition-colors
                focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400
                bg-neutral-950
            "
            >
            <p className="mb-1 text-sm font-medium text-neutral-300">
                LinkedIn
            </p>

            <p className="text-white">
                linkedin.com/in/pablov01
            </p>
            </a>

        </div>

        </section>
    );
}
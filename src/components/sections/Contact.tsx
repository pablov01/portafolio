export default function Contact() {
    return (
        <section className="flex flex-col gap-8 max-w-3xl">

        <div className="flex flex-col gap-3">

            <h2 className="text-2xl font-semibold text-white">
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

            {/* Email */}
            <a
            href="mailto:your@email.com"
            className="
                border border-neutral-800
                rounded-xl
                p-4
                hover:border-neutral-600
                transition-colors
                bg-neutral-950
            "
            >
            <p className="text-sm text-neutral-500 mb-1">
                Email
            </p>

            <p className="text-white">
                your@email.com
            </p>
            </a>

            {/* GitHub */}
            <a
            href="https://github.com/pablov01"
            target="_blank"
            className="
                border border-neutral-800
                rounded-xl
                p-4
                hover:border-neutral-600
                transition-colors
                bg-neutral-950
            "
            >
            <p className="text-sm text-neutral-500 mb-1">
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
            className="
                border border-neutral-800
                rounded-xl
                p-4
                hover:border-neutral-600
                transition-colors
                bg-neutral-950
            "
            >
            <p className="text-sm text-neutral-500 mb-1">
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
const experiences = [
    {
    title: "Full Stack Developer",
    company: "Personal Projects",
    period: "2022 — Present",
    description:
        "Building scalable web applications, backend services, and automation tools using Laravel, Next.js, PostgreSQL, and Docker.",
    },

    {
    title: "Backend & DevOps Enthusiast",
    company: "Self-Hosted Infrastructure",
    period: "2022 — Present",
    description:
        "Working with Linux servers, containerized environments, CI/CD workflows, and infrastructure automation using Docker and GitHub Actions.",
    },

    {
    title: "Software Engineering Student",
    company: "Academic & Personal Projects",
    period: "2021 — Present",
    description:
        "Developing full-stack systems, REST APIs, database architectures, and scalable software solutions focused on real-world scenarios.",
    },
    ];

    export default function Experience() {
    return (
    <section id="experience" className="flex max-w-4xl flex-col gap-8" aria-labelledby="experience-title">

        <h2 id="experience-title" className="text-2xl font-semibold text-white">
        Experience
        </h2>

        <div className="flex flex-col gap-6">

        {experiences.map((exp) => (
            <div
            key={exp.title}
            className="
                border border-neutral-800
                rounded-xl
                p-5
                bg-neutral-950
            "
            >

            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-white font-medium">
                {exp.title}
                </h3>

                <span className="text-sm text-neutral-500">
                {exp.period}
                </span>
            </div>

            <p className="text-neutral-400 text-sm mb-3">
                {exp.company}
            </p>

            <p className="text-neutral-400 leading-relaxed">
                {exp.description}
            </p>

            </div>
        ))}

        </div>

    </section>
    );
}
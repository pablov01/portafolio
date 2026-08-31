const skillGroups = [
    ["Backend", "Laravel, PHP, Node.js, Python, FastAPI, Java, Spring, REST APIs, RabbitMQ", "Advanced"],
    ["Frontend", "React, Next.js, Vue, TypeScript, Tailwind CSS", "Intermediate"],
    ["DevOps", "Docker, Kubernetes, Terraform, Grafana, GitHub Actions, CI/CD, Linux, Bash", "Intermediate"],
    ["Databases", "PostgreSQL, MySQL, MongoDB, Elasticsearch", "Advanced"],
    ["Tools", "Git, VSCode, Postman, Swagger, System Architecture", "Advanced"],
] as const;

export default function Skills() {
    return (
        <section className="flex max-w-4xl flex-col gap-8" aria-labelledby="skills-title">

        <h2 id="skills-title" className="text-2xl font-semibold text-white">
            Skills
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
            {skillGroups.map(([name, technologies, level]) => (
                <div key={name} className="border-l border-cyan-400/60 pl-4">
                    <h3 className="font-medium text-white">{name}</h3>
                    <p className="mt-2 text-neutral-400">{technologies}</p>
                    <span className="mt-3 block text-xs uppercase tracking-wider text-neutral-500">
                        {level}
                    </span>
                </div>
            ))}
        </div>

        </section>
    );
}
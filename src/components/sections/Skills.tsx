const skillGroups = [
    ["Backend", "Laravel, PHP, Node.js, Python, FastAPI, Java, Spring, REST APIs, RabbitMQ", "Advanced"],
    ["Frontend", "React, Next.js, Vue, TypeScript, Tailwind CSS", "Intermediate"],
    ["DevOps", "Docker, Kubernetes, Terraform, Grafana, GitHub Actions, CI/CD, Linux, Bash", "Intermediate"],
    ["Databases", "PostgreSQL, MySQL, MongoDB, Elasticsearch", "Advanced"],
    ["Tools", "Git, VSCode, Postman, Swagger, System Architecture", "Advanced"],
] as const;

import SkillsNetworkWrapper from "@/components/three/SkillsNetworkWrapper";

export default function Skills() {
    return (
        <section className="relative flex max-w-4xl flex-col gap-8 overflow-hidden rounded-2xl p-1" aria-labelledby="skills-title">
        <SkillsNetworkWrapper />

        <h2 id="skills-title" className="relative z-10 text-2xl font-semibold text-white">
            Skills
        </h2>

        <div className="relative z-10 grid gap-6 sm:grid-cols-2">
            {skillGroups.map(([name, technologies, level]) => (
                <div key={name} className="glass hover-3d rounded-xl p-5">
                    <h3 className="font-medium text-white">{name}</h3>
                    <p className="mt-2 text-sm text-neutral-400">{technologies}</p>
                    <span className="mt-3 block text-xs uppercase tracking-wider text-cyan-400/70">
                        {level}
                    </span>
                </div>
            ))}
        </div>

        </section>
    );
}
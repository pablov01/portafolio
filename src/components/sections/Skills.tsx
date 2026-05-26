export default function Skills() {
    return (
        <section className="flex flex-col gap-10 max-w-4xl">

        <h2 className="text-2xl font-semibold text-white">
            Skills
        </h2>

        {/* Backend */}
        <div className="space-y-2">
            <h3 className="text-white font-medium">Backend</h3>
            <p className="text-neutral-400">
            Laravel, Node.js, Python, Java, REST APIs, system architecture
            </p>
            <span className="text-xs text-neutral-500">
            Level: Advanced
            </span>
        </div>

        {/* Frontend */}
        <div className="space-y-2">
            <h3 className="text-white font-medium">Frontend</h3>
            <p className="text-neutral-400">
            React, Next.js, Vue, TypeScript, Tailwind CSS
            </p>
            <span className="text-xs text-neutral-500">
            Level: Intermediate
            </span>
        </div>

        {/* DevOps */}
        <div className="space-y-2">
            <h3 className="text-white font-medium">DevOps</h3>
            <p className="text-neutral-400">
            Docker, Kubernetes, GitHub Actions, CI/CD, Linux servers
            </p>
            <span className="text-xs text-neutral-500">
            Level: Intermediate
            </span>
        </div>

        {/* Databases */}
        <div className="space-y-2">
            <h3 className="text-white font-medium">Databases</h3>
            <p className="text-neutral-400">
            PostgreSQL, MySQL, MongoDB, Elasticsearch
            </p>
            <span className="text-xs text-neutral-500">
            Level: Advanced
            </span>
        </div>

        {/* Tools */}
        <div className="space-y-2">
            <h3 className="text-white font-medium">Tools</h3>
            <p className="text-neutral-400">
            Git, Linux, VSCode, Postman, Swagger
            </p>
            <span className="text-xs text-neutral-500">
            Level: Advanced
            </span>
        </div>

        </section>
    );
}
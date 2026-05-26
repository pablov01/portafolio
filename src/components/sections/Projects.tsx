import { FEATURED_PROJECTS } from "@/lib/projects";
import { getRepoByName } from "@/services/github";
import Image from "next/image";

export default async function Projects() {
    const repos = await Promise.all(
        FEATURED_PROJECTS.map(async (project) => {
        const repoData = await getRepoByName(project.repo);

        return {
            ...project,
            stars: repoData?.stargazers_count || 0,
            url: repoData?.html_url || "#",
        };
        })
    );

    const heroProject = repos.find((project) => project.featured);
    const secondaryProjects = repos.filter(
        (project) => !project.featured
    );

    return (
        <section className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold">
            Featured Projects
        </h2>

        {/* HERO */}
        {heroProject && (
            <a
            href={heroProject.url}
            target="_blank"
            className="
                group relative overflow-hidden
                rounded-2xl border border-neutral-800
                bg-linear-to-br from-neutral-950 to-neutral-900
                p-8 transition-all duration-300
                hover:border-neutral-600
                hover:-translate-y-1
            "
            >
            <div className="grid md:grid.-cols-2gp- items-center">

                <div className="relative overflow-hidden rounded-xl border border-neutral-800">

                    <Image
                        src={heroProject.image || "/projects/error_404.jpg"}
                        alt={heroProject.title}
                        width={1200}
                        height={700}
                        className="
                        w-full h-full object-cover
                        transition duration-500
                        group-hover:scale-[1.03]
                        "
                    />

                    {/* overlay */}
                    <div className="
                        absolute inset-0
                        bg-linear-to-t
                        from-black/60 via-black/10 to-transparent
                    " />
                </div>

                <div className="flex items-center justify-between">
                <span className="
                    text-xs uppercase tracking-widest
                    text-violet-400
                ">
                    Featured Project
                </span>

                <span className="text-sm text-neutral-500">
                    ⭐ {heroProject.stars}
                </span>
                </div>

                <div>
                <h3 className="
                    text-3xl font-bold
                    group-hover:text-white
                ">
                    {heroProject.title}
                </h3>

                <p className="
                    mt-4 max-w-2xl
                    text-neutral-400 leading-relaxed
                ">
                    {heroProject.description}
                </p>
                </div>

                <div className="flex flex-wrap gap-2">
                {heroProject.technologies.map((tech) => (
                    <span
                    key={tech}
                    className="
                        px-3 py-1 rounded-full
                        text-xs
                        border border-neutral-700
                        bg-neutral-900
                        text-neutral-300
                    "
                    >
                    {tech}
                    </span>
                ))}
                </div>

            </div>
            </a>
        )}

        {/* SECONDARY */}
        <div className="grid gap-5 md:grid-cols-2">
            {secondaryProjects.map((project) => (
            <a
                key={project.repo}
                href={project.url}
                target="_blank"
                className="
                group p-5 rounded-xl
                border border-neutral-800
                bg-neutral-950
                hover:border-neutral-600
                transition-all duration-300
                hover:-translate-y-1
                "
            >
                <div className="
                    relative overflow-hidden rounded-lg
                    border border-neutral-800 mb-4
                    ">
                    <Image
                        src={project.image || "/projects/error_404.jpg"}
                        alt={project.title}
                        width={800}
                        height={500}
                        className="
                        w-full object-cover
                        transition duration-500
                        group-hover:scale-[1.03]
                        "
                    />

                    <div className="
                        absolute inset-0
                        bg-linear-to-t
                        from-black/40 to-transparent
                    " />
                    </div>
                <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">
                    {project.title}
                </h3>

                <span className="text-xs text-neutral-500">
                    ⭐ {project.stars}
                </span>
                </div>

                <p className="
                mt-3 text-sm text-neutral-400
                leading-relaxed
                ">
                {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                    <span
                    key={tech}
                    className="
                        px-2 py-1 rounded-md
                        text-xs
                        border border-neutral-800
                        bg-neutral-900
                        text-neutral-400
                    "
                    >
                    {tech}
                    </span>
                ))}
                </div>

            </a>
            ))}
        </div>
        </section>
    );
}


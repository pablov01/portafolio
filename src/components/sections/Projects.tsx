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
                url: repoData?.html_url || project.url,
            };
        })
    );

    const heroProject = repos.find((project) => project.featured);
    const secondaryProjects = repos.filter(
        (project) => !project.featured
    );

    return (
        <section id="projects" className="flex flex-col gap-8" aria-labelledby="projects-title">
        <h2 id="projects-title" className="text-2xl font-semibold">
            Featured Projects
        </h2>

        {/* HERO */}
        {heroProject && (
            <>
                {heroProject.url ? (
                    <a
                        href={heroProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${heroProject.title} on GitHub, opens in a new tab`}
                        className="group relative block overflow-hidden rounded-2xl border border-neutral-800 bg-linear-to-br from-neutral-950 to-neutral-900 p-8 motion-safe:transition-all motion-safe:duration-300 hover:border-neutral-600 motion-safe:hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
                    >
                        <HeroProjectContent project={heroProject} />
                    </a>
                ) : (
                    <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-linear-to-br from-neutral-950 to-neutral-900 p-8">
                        <HeroProjectContent project={heroProject} />
                    </div>
                )}
            </>
        )}

        {/* SECONDARY */}
        <div className="grid gap-5 md:grid-cols-2">
            {secondaryProjects.map((project) => (
                project.url ? (
                    <a
                        key={project.repo}
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} on GitHub, opens in a new tab`}
                        className="group rounded-xl border border-neutral-800 bg-neutral-950 p-5 motion-safe:transition-all motion-safe:duration-300 hover:border-neutral-600 motion-safe:hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
                    >
                        <ProjectCardContent project={project} />
                    </a>
                ) : (
                    <div key={project.repo} className="rounded-xl border border-neutral-800 bg-neutral-950 p-5">
                        <ProjectCardContent project={project} />
                    </div>
                )
            ))}
        </div>
        </section>
    );
}

type ProjectWithRepo = (typeof FEATURED_PROJECTS)[number] & {
    stars: number;
    url?: string;
};

function HeroProjectContent({ project }: { project: ProjectWithRepo }) {
    return (
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            {project.image && (
                <div className="relative aspect-[12/7] overflow-hidden rounded-xl border border-neutral-800">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                </div>
            )}

            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-medium uppercase tracking-widest text-cyan-300">
                        Featured Project
                    </span>
                    <span className="text-sm text-neutral-300">Stars: {project.stars}</span>
                </div>

                <div>
                    <h3 className="text-3xl font-bold group-hover:text-white">{project.title}</h3>
                    <p className="mt-4 max-w-2xl leading-relaxed text-neutral-400">{project.description}</p>
                    {project.obs && (
                        <p className="mt-3 text-sm text-amber-300">{project.obs}</p>
                    )}
                </div>

                <ProjectTechnologies project={project} />
                {!project.url && !project.obs && <RepositoryUnavailable />}
            </div>
        </div>
    );
}

function ProjectCardContent({ project }: { project: ProjectWithRepo }) {
    return (
        <>
            {project.image && (
                <div className="relative mb-4 aspect-[8/5] overflow-hidden rounded-lg border border-neutral-800">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                </div>
            )}
            <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <span className="text-xs text-neutral-300">Stars: {project.stars}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">{project.description}</p>
            {project.obs && (
                <p className="mt-3 text-sm text-amber-300">{project.obs}</p>
            )}
            <ProjectTechnologies project={project} />
            {!project.url && !project.obs && <RepositoryUnavailable />}
        </>
    );
}

function ProjectTechnologies({ project }: { project: ProjectWithRepo }) {
    return (
        <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
                <span key={tech} className="rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1 text-xs text-neutral-300">
                    {tech}
                </span>
            ))}
        </div>
    );
}

function RepositoryUnavailable() {
    return <p className="text-sm font-medium text-amber-300">Repository unavailable</p>;
}


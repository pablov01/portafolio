import { getRepos, getFeaturedRepos } from "@/services/github";

export default async function Projects() {
    const repos = await getRepos();

    const featured = getFeaturedRepos(repos);
    const heroProject = featured[0];
    const secondaryProjects = featured.slice(1);

    return (
            <section className="flex flex-col gap-8">
                
                <h2 className="text-2xl font-semibold">
                Featured Projects
                </h2>

                {/* HERO PROJECT */}
                {heroProject && (
                <a
                    href={heroProject.html_url}
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
                    <div className="flex flex-col gap-5">
                    
                    <div className="flex items-center justify-between">
                        <span className="
                        text-xs uppercase tracking-widest
                        text-violet-400
                        ">
                        Featured Project
                        </span>

                        <span className="text-sm text-neutral-500">
                        ⭐ {heroProject.stargazers_count}
                        </span>
                    </div>

                    <div>
                        <h3 className="
                        text-3xl font-bold
                        group-hover:text-white
                        transition
                        ">
                        {heroProject.name}
                        </h3>

                        <p className="
                        mt-4 max-w-2xl
                        text-neutral-400 leading-relaxed
                        ">
                        {heroProject.description || "No description provided"}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="
                        px-3 py-1 rounded-full
                        bg-neutral-900 border border-neutral-700
                        text-sm text-neutral-300
                        ">
                        {heroProject.language || "Unknown"}
                        </span>

                        <span className="
                        text-sm text-neutral-500
                        group-hover:text-neutral-300 transition
                        ">
                        View Repository →
                        </span>
                    </div>

                    </div>
                </a>
                )}

                {/* SECONDARY PROJECTS */}
                <div className="grid gap-5 md:grid-cols-2">
                {secondaryProjects.map((repo) => (
                    <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    className="
                        group relative p-5 rounded-xl
                        border border-neutral-800
                        bg-neutral-950
                        hover:border-neutral-600
                        transition-all duration-300
                        hover:-translate-y-1
                    "
                    >
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg group-hover:text-white">
                        {repo.name}
                        </h3>

                        <span className="text-xs text-neutral-500">
                        ⭐ {repo.stargazers_count}
                        </span>
                    </div>

                    <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
                        {repo.description || "No description provided"}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="
                        text-xs px-2 py-1 rounded-md
                        bg-neutral-900 border border-neutral-800
                        text-neutral-400
                        ">
                        {repo.language || "Unknown"}
                        </span>

                        <span className="
                        text-xs text-neutral-600
                        group-hover:text-neutral-400 transition
                        ">
                        View project →
                        </span>
                    </div>
                    </a>
                ))}
                </div>
            </section>
            );
}
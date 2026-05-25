import { getRepos, getFeaturedRepos } from "@/services/github";

export default async function Projects() {
    const repos = await getRepos();
    const featured = getFeaturedRepos(repos);

    return (
        <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold">Featured Projects</h2>

        <div className="grid gap-4 md:grid-cols-2">
            {featured.map((repo) => (
            <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                className="p-4 border border-neutral-800 rounded-lg hover:border-neutral-600 transition"
            >
                <h3 className="font-semibold">{repo.name}</h3>

                <p className="text-sm text-neutral-400 mt-2">
                {repo.description || "No description"}
                </p>

                <div className="mt-3 text-xs text-neutral-500 flex justify-between">
                <span>{repo.language}</span>
                <span>⭐ {repo.stargazers_count}</span>
                </div>
            </a>
            ))}
        </div>
        </section>
    );
}
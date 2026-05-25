const GITHUB_USERNAME = "pablov01";

export type GitHubRepo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  fork: boolean;
  updated_at: string;
};

export async function getRepos(): Promise<GitHubRepo[]> {
    const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`,
        {
            next: { revalidate: 3600 },
        }
    );

    if (!res.ok) {
        throw new Error("Error fetching GitHub repositories");
    }

    const data = await res.json();

    // 🔥 FILTRO PROFESIONAL
    return data
        .filter((repo: GitHubRepo) => !repo.fork) // eliminar forks
        .sort(
        (a: GitHubRepo, b: GitHubRepo) =>
            b.stargazers_count - a.stargazers_count
        );
}

export function getFeaturedRepos(repos: GitHubRepo[]) {
    return repos
        .filter((repo) => repo.stargazers_count > 0 || repo.language)
        .slice(0, 6);
}
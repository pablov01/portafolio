const GITHUB_USERNAME = "pablov01";

export type GitHubRepo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
};

export async function getRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`,
    {
      next: { revalidate: 3600 }, // ISR caching (Next.js)
    }
  );

  if (!res.ok) {
    throw new Error("Error fetching GitHub repositories");
  }

  const data = await res.json();

  return data;
}
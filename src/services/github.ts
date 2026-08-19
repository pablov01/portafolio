const GITHUB_USERNAME = "pablov01";

export async function getRepoByName(name: string) {
    try {
        const res = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${name}`,
            {
                next: { revalidate: 3600 },
            }
        );

        if (!res.ok) {
            return null;
        }

        return res.json();
    } catch {
        return null;
    }
}


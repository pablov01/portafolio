export const FEATURED_PROJECTS: FeaturedProject[] = [
    {
        repo: "portafolio",
        title: "Developer Portfolio",
        description:
        "Modern developer portfolio built with Next.js, TypeScript and GitHub API integration.",

        technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind",
        "GitHub API",
        ],

        image: "/projects/portafolio.png",

        featured: true,
    },

    {
        repo: "financial-cooperative-system",
        title: "Financial Cooperative System",
        description:
        "Scalable financial management platform focused on automation and backend architecture.",

        technologies: [
        "Laravel",
        "PostgreSQL",
        "Docker",
        "Queues",
        ],

        featured: false,
    },

    {
        repo: "devops-monitoring-stack",
        title: "DevOps Monitoring Stack",
        description:
        "Infrastructure observability environment using containers, metrics and automated deployments.",

        technologies: [
        "Docker",
        "Grafana",
        "CI/CD",
        "Linux",
        ],

        featured: false,
    },
];

export type FeaturedProject = {
    repo: string;
    title: string;
    description: string;
    technologies: string[];
    image?: string;
    featured: boolean;
};

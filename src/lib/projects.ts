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

        url: "https://github.com/pablov01/portafolio.git",
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

        image: "/projects/financial-cooperative-system.jpg",
        obs: "This project is owned by my latest company",

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

        image: "/projects/dev-ops.jpg",

        featured: false,
    },

    {
        repo: "automation-integration-services",
        title: "Automation & Integration Services",
        description:
        "Background processing and service integration architecture with async workflows and APIs.",

        technologies: [
        "Laravel",
        "RabbitMQ",
        "APIs",
        "Queues",
        ],

        image: "/projects/dev-ops.jpg",

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
    url?: string|null;
    obs?: string|null;
};

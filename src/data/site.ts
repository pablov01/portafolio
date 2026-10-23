import { ABOUT_TEXT, EXPERIENCES, PROFILE, SKILL_GROUPS } from "./profile";
import { FEATURED_PROJECTS } from "./projects";

export const NAV = [
    { label: "Work", href: "#work" },
    { label: "Path", href: "#path" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Contact", href: "#contact" },
] as const;

export const HERO = {
    title: "PABLO",
    kicker: `${PROFILE.name.split(" ")[1]} · ${PROFILE.role}`,
    status: "Open to work",
    timezone: "America/Asuncion",
    timezoneLabel: "Asunción · UTC−3",
    coords: `${PROFILE.location} · 25.26°S 57.57°W`,
    site: "Backend · DevOps · Full stack",
} as const;

export const WORK_INTRO = {
    eyebrow: "Selected work",
    heading: "Systems built to hold up.",
    body: ABOUT_TEXT[1],
    note: ABOUT_TEXT[3],
} as const;

const WORK_IMAGES = [
    "/work/m1-launch.webp",
    "/work/m2-orbit.webp",
    "/work/m3-base.webp",
    "/work/m4-walk.webp",
];

export const WORK = FEATURED_PROJECTS.map((project, index) => ({
    ...project,
    image: WORK_IMAGES[index] ?? WORK_IMAGES[0],
}));

const orderedExperience = [EXPERIENCES[2], EXPERIENCES[0], EXPERIENCES[1]];

export const PATH = {
    eyebrow: "Path",
    heading: "From first commit to production.",
    startYear: 2021,
    legs: [
        {
            day: orderedExperience[0].period.split(" — ")[0],
            title: "Foundations",
            body: `${orderedExperience[0].company}. ${orderedExperience[0].description}`,
        },
        {
            day: orderedExperience[1].period.split(" — ")[0],
            title: "Full-stack delivery",
            body: `${orderedExperience[1].company}. ${orderedExperience[1].description}`,
        },
        {
            day: orderedExperience[2].period.split(" — ")[0],
            title: "Self-hosted infrastructure",
            body: orderedExperience[2].description,
        },
        {
            day: "Now",
            title: "Production systems",
            body: `${PROFILE.availability}. ${PROFILE.bio}`,
        },
    ],
} as const;

const countTools = (group: string) => {
    const found = SKILL_GROUPS.find((item) => item.name === group);
    return found ? found.technologies.split(",").length : 0;
};

export const CAPABILITIES = {
    eyebrow: "Capabilities",
    heading: "Three ways I plug in.",
    note: `${SKILL_GROUPS.length} skill groups · ${PROFILE.location}`,
    items: [
        {
            name: "Backend",
            count: countTools("Backend"),
            unit: "tools",
            lines: [
                "Laravel, PHP & Node.js services",
                "REST APIs, queues & RabbitMQ",
                "Relational data with PostgreSQL",
            ],
            cta: "See the backend work",
            featured: true,
        },
        {
            name: "DevOps",
            count: countTools("DevOps"),
            unit: "tools",
            lines: [
                "Docker & Kubernetes deployments",
                "Terraform & GitHub Actions",
                "Linux, Grafana & CI/CD pipelines",
            ],
            cta: "See the infrastructure work",
            featured: false,
        },
        {
            name: "Full stack",
            count: countTools("Frontend"),
            unit: "tools",
            lines: [
                "React, Next.js & Vue interfaces",
                "TypeScript & Tailwind CSS",
                "End-to-end delivery and handoff",
            ],
            cta: "See the full-stack work",
            featured: false,
        },
    ],
} as const;

export const CONTACT = {
    eyebrow: "Contact",
    heading: "Let's put something in production.",
    body: "I'm open to backend, platform and full-stack work. The fastest way to reach me is GitHub or LinkedIn — pick whichever fits.",
    timezone: "America/Asuncion",
    timezoneLabel: "Asunción · UTC−3",
    availability: PROFILE.availability,
    channels: [
        {
            label: "GitHub",
            value: "github.com/pablov01",
            href: PROFILE.links.github,
            note: "Code, experiments and open source.",
        },
        {
            label: "LinkedIn",
            value: "linkedin.com/in/pablov01",
            href: PROFILE.links.linkedin,
            note: "Work history and direct messages.",
        },
    ],
    resume: {
        label: "Résumé",
        note: "Two pages · English and Spanish",
        versions: [
            {
                language: "English",
                code: "EN",
                href: "/documents/resume-en.pdf",
                download: "Pablo-Villalba-Resume-EN.pdf",
            },
            {
                language: "Español",
                code: "ES",
                href: "/documents/resume-es.pdf",
                download: "Pablo-Villalba-CV-ES.pdf",
            },
        ],
    },
} as const;

export const SKILLS = SKILL_GROUPS;

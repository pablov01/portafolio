export const PROFILE = {
  name: "Pablo Villalba",
  role: "Backend & DevOps Developer",
  tagline: "Focused on Laravel, PostgreSQL, Docker and automation.",
  location: "Paraguay",
  bio: "I build backend systems, scalable applications and automation workflows focused on maintainability, performance and clean architecture.",
  interests: [
    "Backend Engineering",
    "DevOps & CI/CD",
    "System Architecture",
    "Automation",
    "Cybersecurity",
  ],
  availability: "Available for new projects",
  links: {
    github: "https://github.com/pablov01",
    linkedin: "https://www.linkedin.com/in/pablov01/",
    portfolio: "https://github.com/pablov01/portafolio",
  },
} as const;

export const ABOUT_TEXT = [
  "I’m a software developer who enjoys building systems that actually work in real environments.",
  "I like turning ideas into clean, functional, and scalable applications, focusing mainly on backend development and system architecture.",
  "I’m constantly learning and improving how I design and structure software, especially in areas like performance, scalability, and DevOps.",
  "Outside of coding, I enjoy exploring new technologies and understanding how complex systems are built.",
];

export const EXPERIENCES = [
  {
    title: "Full Stack Developer",
    company: "Personal Projects",
    period: "2022 — Present",
    description:
      "Building scalable web applications, backend services, and automation tools using Laravel, Next.js, PostgreSQL, and Docker.",
  },
  {
    title: "Backend & DevOps Enthusiast",
    company: "Self-Hosted Infrastructure",
    period: "2022 — Present",
    description:
      "Working with Linux servers, containerized environments, CI/CD workflows, and infrastructure automation using Docker and GitHub Actions.",
  },
  {
    title: "Software Engineering Student",
    company: "Academic & Personal Projects",
    period: "2021 — Present",
    description:
      "Developing full-stack systems, REST APIs, database architectures, and scalable software solutions focused on real-world scenarios.",
  },
] as const;

export const SKILL_GROUPS = [
  {
    name: "Backend",
    technologies: "Laravel, PHP, Node.js, Python, FastAPI, Java, Spring, REST APIs, RabbitMQ",
    level: "Advanced",
    icons: "laravel,php,postgresql,nodejs,python,fastapi,spring,rabbitmq",
  },
  {
    name: "Frontend",
    technologies: "React, Next.js, Vue, TypeScript, Tailwind CSS",
    level: "Intermediate",
    icons: "react,nextjs,vue,ts,tailwind",
  },
  {
    name: "DevOps",
    technologies: "Docker, Kubernetes, Terraform, Grafana, GitHub Actions, CI/CD, Linux, Bash",
    level: "Intermediate",
    icons: "docker,kubernetes,terraform,grafana,githubactions,linux,bash",
  },
  {
    name: "Databases",
    technologies: "PostgreSQL, MySQL, MongoDB, Elasticsearch",
    level: "Advanced",
    icons: "postgres,mysql,mongodb,elasticsearch",
  },
  {
    name: "Tools",
    technologies: "Git, VSCode, Postman, Swagger, System Architecture",
    level: "Advanced",
    icons: "git,vscode,postman",
  },
] as const;

// For radar charts — unified, edited in one place
export const SKILLS_RADAR = {
  title: "Skill Radar",
  axes: [
    { label: "Backend", value: 90 },
    { label: "DevOps", value: 78 },
    { label: "Databases", value: 85 },
    { label: "Frontend", value: 72 },
    { label: "Architecture", value: 80 },
    { label: "Automation", value: 88 },
  ],
};

export const STACK_RADAR = {
  title: "Stack & Infra",
  axes: [
    { label: "Laravel / PHP", value: 90 },
    { label: "PostgreSQL", value: 86 },
    { label: "Docker", value: 84 },
    { label: "TypeScript", value: 75 },
    { label: "RabbitMQ", value: 78 },
    { label: "Linux / CI/CD", value: 80 },
  ],
};

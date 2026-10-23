import { Capabilities } from "@/components/Capabilities";
import { Footer, Header } from "@/components/Chrome";
import { ContactSection } from "@/components/ContactSection";
import { Earthrise } from "@/components/Earthrise";
import { Trajectory } from "@/components/Trajectory";
import { WorkReel, type WorkItem } from "@/components/WorkReel";
import { WORK } from "@/data/site";
import { getRepoByName } from "@/services/github";

export default async function Home() {
    const projects: WorkItem[] = await Promise.all(
        WORK.map(async (project) => {
            const repo = await getRepoByName(project.repo);

            return {
                repo: project.repo,
                title: project.title,
                description: project.description,
                technologies: project.technologies,
                image: project.image,
                category: project.category,
                obs: project.obs,
                url: repo?.html_url ?? project.url ?? null,
                stars:
                    typeof repo?.stargazers_count === "number"
                        ? repo.stargazers_count
                        : 0,
            };
        }),
    );

    return (
        <>
            <Header />
            <main id="main-content">
                <Earthrise />
                <WorkReel projects={projects} />
                <Trajectory />
                <Capabilities />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}

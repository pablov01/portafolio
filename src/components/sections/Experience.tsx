import { EXPERIENCES } from "@/data/profile";

    export default function Experience() {
    return (
    <section id="experience" className="flex max-w-4xl flex-col gap-8" aria-labelledby="experience-title">

        <h2 id="experience-title" className="text-2xl font-semibold text-white">
        Experience
        </h2>

        <div className="flex flex-col gap-6">

        {EXPERIENCES.map((exp) => (
            <div
            key={exp.title}
            className="glass hover-3d rounded-xl p-5"
            >

            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-white font-medium">
                {exp.title}
                </h3>

                <span className="text-sm text-neutral-500">
                {exp.period}
                </span>
            </div>

            <p className="text-neutral-400 text-sm mb-3">
                {exp.company}
            </p>

            <p className="text-neutral-400 leading-relaxed">
                {exp.description}
            </p>

            </div>
        ))}

        </div>

    </section>
    );
}
import { SKILL_GROUPS } from "@/data/profile";
import SkillsNetworkWrapper from "@/components/three/SkillsNetworkWrapper";

export default function Skills() {
    return (
        <section className="relative flex max-w-4xl flex-col gap-8 overflow-hidden rounded-2xl p-1" aria-labelledby="skills-title">
        <SkillsNetworkWrapper />

        <h2 id="skills-title" className="relative z-10 text-2xl font-semibold text-white">
            Skills
        </h2>

        <div className="relative z-10 grid gap-6 sm:grid-cols-2">
            {SKILL_GROUPS.map((g) => (
                <div key={g.name} className="glass hover-3d rounded-xl p-5">
                    <h3 className="font-medium text-white">{g.name}</h3>
                    <p className="mt-2 text-sm text-neutral-400">{g.technologies}</p>
                    <span className="mt-3 block text-xs uppercase tracking-wider text-cyan-400/70">
                        {g.level}
                    </span>
                </div>
            ))}
        </div>

        </section>
    );
}
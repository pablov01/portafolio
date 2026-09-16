import { ABOUT_TEXT, PROFILE } from "@/data/profile";

export default function About() {
    return (
        <section className="glass hover-3d flex max-w-3xl flex-col gap-6 rounded-2xl p-8" aria-labelledby="about-title">
        <h2 id="about-title" className="mb-2 text-2xl font-semibold text-white">
            About Me
        </h2>
        <div className="w-12 h-0.5 bg-cyan-400/60 mb-6"/>
        <p className="text-sm font-medium uppercase tracking-widest text-cyan-400/70">{PROFILE.role} — {PROFILE.tagline}</p>
        {ABOUT_TEXT.map((p) => (
            <p key={p.slice(0, 20)} className="text-neutral-400 leading-relaxed">{p}</p>
        ))}
        </section>
    );
}
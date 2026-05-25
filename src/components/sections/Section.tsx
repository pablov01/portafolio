interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">
        {title}
      </h2>
      <div className="text-neutral-400 leading-relaxed">
        {children}
      </div>
    </section>
  );
}
export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="container py-16 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent-violet">
            {eyebrow}
          </p>
        )}
        <h1 className="text-balance text-headline-xl sm:text-display-1">
          <span className="text-gradient">{title}</span>
        </h1>
        {lead && (
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-on-surface-variant sm:text-lg">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}

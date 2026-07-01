import { Flourish } from "@/components/illustrations/Flourish";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  /** Decorative cursive accent (usually English), e.g. "Save the Date". */
  scriptLabel?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

/** Consistent editorial section header: script accent + serif title + flourish. */
export function SectionHeading({
  scriptLabel,
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("text-center", className)}>
      {scriptLabel ? (
        <p className="font-script text-4xl leading-none text-accent sm:text-5xl">
          {scriptLabel}
        </p>
      ) : null}
      <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-primary sm:text-[2.5rem]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mx-auto mt-3 max-w-md text-balance font-body text-[0.95rem] leading-relaxed text-subtle">
          {subtitle}
        </p>
      ) : null}
      <Flourish className="mx-auto mt-6 h-5 w-40 text-accent/70" />
    </Reveal>
  );
}

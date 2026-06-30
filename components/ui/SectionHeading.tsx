import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

/** Shared centered section title + supporting line. */
export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("text-center", className)}>
      <h2 className="font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mx-auto mt-3 max-w-md text-balance text-sm text-subtle sm:text-base">
          {subtitle}
        </p>
      ) : null}
      <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </Reveal>
  );
}

import { useCountUp } from "../hooks/useCountUp";

export function StatCounter({
  value,
  suffix,
  label,
  placeholder,
}: {
  value: number;
  suffix: string;
  label: string;
  placeholder?: boolean;
}) {
  const { ref, value: current } = useCountUp(value);

  return (
    <div ref={ref as never} className="text-center">
      <div className="font-display text-4xl md:text-5xl text-gradient-red">
        {placeholder ? suffix : `${current}${suffix}`}
      </div>
      <div className="mt-2 text-xs md:text-sm tracking-[0.2em] uppercase text-ink-400">
        {label}
      </div>
    </div>
  );
}

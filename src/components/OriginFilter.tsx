import type { RevivalOrigin } from "../data/types";

export type OriginFilterValue = RevivalOrigin | "all";

const options: { value: OriginFilterValue; label: string; hint: string }[] = [
  { value: "all", label: "All", hint: "Everything" },
  { value: "organic", label: "Organic", hint: "Unplanned or grassroots — no touring ministry behind it" },
  { value: "organized", label: "Organized", hint: "Produced by a named touring ministry or parachurch org" },
];

type Props = {
  value: OriginFilterValue;
  onChange: (value: OriginFilterValue) => void;
};

export default function OriginFilter({ value, onChange }: Props) {
  return (
    <div className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 flex flex-col gap-2">
      <span className="text-sm font-medium">How did it start?</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            title={opt.hint}
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              value === opt.value
                ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                : "border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-black/50 dark:text-white/40">
        {options.find((o) => o.value === value)?.hint}
      </p>
    </div>
  );
}

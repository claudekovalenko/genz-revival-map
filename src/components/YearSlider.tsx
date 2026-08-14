import type { YearMode } from "../data/utils";

type Props = {
  year: number;
  minYear: number;
  maxYear: number;
  mode: YearMode;
  onYearChange: (year: number) => void;
  onModeChange: (mode: YearMode) => void;
};

export default function YearSlider({ year, minYear, maxYear, mode, onYearChange, onModeChange }: Props) {
  return (
    <div className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium whitespace-nowrap">
          {mode === "cumulative" ? "Through" : "In"}{" "}
          <span className="text-lg font-semibold">{year}</span>
        </span>
        <div className="flex text-xs rounded-full border border-black/10 dark:border-white/10 overflow-hidden shrink-0">
          <button
            type="button"
            onClick={() => onModeChange("cumulative")}
            className={`px-2.5 py-1 whitespace-nowrap ${
              mode === "cumulative" ? "bg-black text-white dark:bg-white dark:text-black" : ""
            }`}
          >
            Cumulative
          </button>
          <button
            type="button"
            onClick={() => onModeChange("single")}
            className={`px-2.5 py-1 whitespace-nowrap ${
              mode === "single" ? "bg-black text-white dark:bg-white dark:text-black" : ""
            }`}
          >
            One year
          </button>
        </div>
      </div>
      <input
        type="range"
        min={minYear}
        max={maxYear}
        step={1}
        value={year}
        onChange={(e) => onYearChange(Number(e.target.value))}
        className="w-full accent-black dark:accent-white"
      />
      <div className="flex justify-between text-xs text-black/40 dark:text-white/40">
        <span>{minYear}</span>
        <span>{maxYear}</span>
      </div>
    </div>
  );
}

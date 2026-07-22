type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export default function NplFilter({ value, onChange }: Props) {
  return (
    <div className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 flex flex-col gap-2">
      <span className="text-sm font-medium">No Place Left network</span>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          title="Show only No Place Left / e3 Partners disciple-making network entries"
          onClick={() => onChange(!value)}
          aria-pressed={value}
          className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
            value
              ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
              : "border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
          }`}
        >
          {value ? "NPL only" : "Show NPL"}
        </button>
      </div>
      <p className="text-xs text-black/50 dark:text-white/40">
        Isolate the No Place Left / e3 Partners disciple-making infrastructure entries — decentralized training
        networks, not dated events.
      </p>
    </div>
  );
}

const LEVELS = ["clara", "media", "escura"] as const;
type RoastLevel = (typeof LEVELS)[number];

const LABEL: Record<RoastLevel, string> = {
  clara: "Clara",
  media: "Média",
  escura: "Escura",
};

// Medidor de torra: posiciona o nivel atual numa escala clara->escura.
export function RoastMeter({ roast }: { roast: string }) {
  const current = (LEVELS as readonly string[]).includes(roast) ? (roast as RoastLevel) : "media";

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="eyebrow">Torra</span>
        <span className="font-mono text-[11px] font-bold text-ink">{LABEL[current]}</span>
      </div>
      <div className="flex gap-1" role="img" aria-label={`Nível de torra: ${LABEL[current]}`}>
        {LEVELS.map((level, i) => {
          const activeIndex = LEVELS.indexOf(current);
          const filled = i <= activeIndex;
          return (
            <span
              key={level}
              className={`h-1.5 flex-1 rounded-full ${filled ? "bg-ink" : "bg-line"}`}
            />
          );
        })}
      </div>
    </div>
  );
}

const ROAST_BG: Record<string, string> = {
  clara: "bg-roast-light text-roast-dark",
  media: "bg-roast-medium text-paper",
  escura: "bg-roast-dark text-paper",
};

// Rotulo de saco estilizado no lugar de foto de produto. A cor vem do nivel de
// torra; o traco diagonal remete a etiqueta carimbada do microlote.
// compact = card do grid (nome vem no titulo ao lado); full = hero/produto.
export function ProductVisual({
  name,
  origin,
  variety,
  roast,
  compact = false,
  className = "",
}: {
  name: string;
  origin: string;
  variety: string;
  roast: string;
  compact?: boolean;
  className?: string;
}) {
  const tone = ROAST_BG[roast] ?? ROAST_BG.media;
  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden p-5 ${
        compact ? "aspect-[4/3]" : "aspect-[4/5]"
      } ${tone} ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 top-1/2 h-px w-56 origin-right -translate-y-1/2 rotate-[-28deg] bg-current opacity-20"
      />
      <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
        <span className="opacity-80">{variety}</span>
        <span className="opacity-60">Microlote</span>
      </div>

      {compact ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] opacity-80">{origin}</p>
      ) : (
        <div>
          <p className="font-display text-3xl font-extrabold leading-[0.95] tracking-tightest">
            {name}
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] opacity-80">
            {origin}
          </p>
        </div>
      )}
    </div>
  );
}

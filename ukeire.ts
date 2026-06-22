import { Tile as TileCode } from "../lib/mahjong/tiles";

type TileProps = {
  tile: TileCode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: (tile: TileCode) => void;
  compact?: boolean;
};

const suitLabels: Record<string, string> = {
  m: "萬",
  p: "筒",
  s: "索"
};

export function Tile({ tile, selected, disabled, onClick, compact }: TileProps) {
  const suit = tile[1];
  const className = [
    "tile",
    `tile-${suit}`,
    selected ? "tile-selected" : "",
    compact ? "tile-compact" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={className}
      disabled={disabled || !onClick}
      onClick={() => onClick?.(tile)}
      aria-label={`${tile[0]}${suitLabels[suit]}`}
      title={`${tile[0]}${suitLabels[suit]}`}
    >
      <span className="tile-rank">{tile[0]}</span>
      <span className="tile-suit">{suitLabels[suit]}</span>
    </button>
  );
}

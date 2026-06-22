import { Tile as TileCode } from "../lib/mahjong/tiles";
import { Tile } from "./Tile";

type HandViewProps = {
  tiles: TileCode[];
  selectedTile?: TileCode;
  onSelect?: (tile: TileCode) => void;
  compact?: boolean;
};

export function HandView({ tiles, selectedTile, onSelect, compact }: HandViewProps) {
  return (
    <div className="hand-view" role="group" aria-label="手牌">
      {tiles.map((tile, index) => (
        <Tile
          key={`${tile}-${index}`}
          tile={tile}
          selected={selectedTile === tile}
          onClick={onSelect}
          compact={compact}
        />
      ))}
    </div>
  );
}

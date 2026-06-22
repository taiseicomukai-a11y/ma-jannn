import { ALL_TILES, Tile, compareTiles, tileIndex } from "./tiles";
import { addTile, describeImprovement, removeTile, uniqueTiles, visibleRemainingCounts } from "./hand";
import { calcShanten } from "./shanten";

export type EffectiveTileAnalysis = {
  hand: Tile[];
  targetMelds: number;
  effectiveTiles: Tile[];
  typeCount: number;
  totalCount: number;
  currentShanten: number;
  explanation: string;
};

export type UkeireResult = {
  discard: Tile;
  effectiveTiles: Tile[];
  typeCount: number;
  totalCount: number;
  shantenAfterDiscard: number;
  explanation: string;
};

export type HandAnalysis = {
  hand: Tile[];
  targetMelds: number;
  results: UkeireResult[];
  bestDiscards: Tile[];
  bestResult: UkeireResult;
};

export function analyzeEffectiveDraws(
  hand: Tile[],
  targetMelds: number,
  visibleTiles: Tile[] = hand
): EffectiveTileAnalysis {
  const currentShanten = calcShanten(hand, targetMelds);
  const remaining = visibleRemainingCounts(visibleTiles);
  const effectiveTiles: Tile[] = [];
  let totalCount = 0;

  for (const tile of ALL_TILES) {
    const index = tileIndex(tile);
    if (remaining[index] <= 0) continue;
    if (calcShanten(addTile(hand, tile), targetMelds) < currentShanten) {
      effectiveTiles.push(tile);
      totalCount += remaining[index];
    }
  }

  effectiveTiles.sort(compareTiles);
  return {
    hand: [...hand].sort(compareTiles),
    targetMelds,
    effectiveTiles,
    typeCount: effectiveTiles.length,
    totalCount,
    currentShanten,
    explanation:
      effectiveTiles.length === 0
        ? "この形は、次の1枚だけではシャンテン数が進む受け入れがありません。"
        : `次に引くと前進する牌は${effectiveTiles.length}種類、残り枚数で${totalCount}枚です。`
  };
}

export function calculateUkeireForDiscard(
  hand: Tile[],
  discard: Tile,
  targetMelds: number,
  visibleTiles: Tile[] = hand
): UkeireResult {
  const afterDiscard = removeTile(hand, discard);
  const drawAnalysis = analyzeEffectiveDraws(afterDiscard, targetMelds, visibleTiles);

  return {
    discard,
    effectiveTiles: drawAnalysis.effectiveTiles,
    typeCount: drawAnalysis.typeCount,
    totalCount: drawAnalysis.totalCount,
    shantenAfterDiscard: drawAnalysis.currentShanten,
    explanation: describeImprovement(discard, drawAnalysis.effectiveTiles, drawAnalysis.totalCount)
  };
}

export function analyzeHand(hand: Tile[], targetMelds: number): HandAnalysis {
  const results = uniqueTiles(hand)
    .map((discard) => calculateUkeireForDiscard(hand, discard, targetMelds))
    .sort((a, b) => {
      if (b.totalCount !== a.totalCount) return b.totalCount - a.totalCount;
      if (b.typeCount !== a.typeCount) return b.typeCount - a.typeCount;
      return tileIndex(a.discard) - tileIndex(b.discard);
    });

  if (results.length === 0) {
    throw new Error("手牌が空です");
  }

  const bestCount = results[0].totalCount;
  const bestDiscards = results
    .filter((result) => result.totalCount === bestCount)
    .map((result) => result.discard);

  return {
    hand: [...hand].sort(compareTiles),
    targetMelds,
    results,
    bestDiscards,
    bestResult: results[0]
  };
}

export function isBestDiscard(hand: Tile[], discard: Tile, targetMelds: number): boolean {
  return analyzeHand(hand, targetMelds).bestDiscards.includes(discard);
}

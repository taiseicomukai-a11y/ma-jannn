import { useMemo, useState } from "react";
import { BarChart3, CheckCircle2, MousePointer2, RotateCcw, Sparkles, XCircle } from "lucide-react";
import { HandView } from "../components/HandView";
import { Tile } from "../components/Tile";
import { Difficulty, DIFFICULTIES, generateRandomHand, getDifficulty } from "../lib/mahjong/hand";
import { Tile as TileCode, formatTiles } from "../lib/mahjong/tiles";
import { analyzeEffectiveDraws, analyzeHand, EffectiveTileAnalysis, HandAnalysis } from "../lib/mahjong/ukeire";

type Mode = "home" | "drawQuiz" | "drawResult" | "discardQuiz" | "discardResult";

type DrawAnswer = {
  typeCount: string;
  totalCount: string;
};

type DrawResultState = {
  analysis: EffectiveTileAnalysis;
  answer: DrawAnswer;
};

type DiscardResultState = {
  analysis: HandAnalysis;
  selectedDiscard: TileCode;
};

const APP_NAME = "牌効率トレーナー";

export default function App() {
  const [mode, setMode] = useState<Mode>("home");
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
  const config = getDifficulty(difficulty);
  const [drawHand, setDrawHand] = useState<TileCode[]>(() => generateRandomHand(config.drawQuizSize));
  const [discardHand, setDiscardHand] = useState<TileCode[]>(() => generateRandomHand(config.discardQuizSize));
  const [drawAnswer, setDrawAnswer] = useState<DrawAnswer>({ typeCount: "", totalCount: "" });
  const [drawResult, setDrawResult] = useState<DrawResultState | null>(null);
  const [discardResult, setDiscardResult] = useState<DiscardResultState | null>(null);

  const drawAnalysis = useMemo(
    () => analyzeEffectiveDraws(drawHand, config.targetMelds),
    [drawHand, config.targetMelds]
  );

  const discardAnalysis = useMemo(
    () => analyzeHand(discardHand, config.targetMelds),
    [discardHand, config.targetMelds]
  );

  function chooseDifficulty(next: Difficulty) {
    const nextConfig = getDifficulty(next);
    setDifficulty(next);
    setDrawHand(generateRandomHand(nextConfig.drawQuizSize));
    setDiscardHand(generateRandomHand(nextConfig.discardQuizSize));
    setDrawAnswer({ typeCount: "", totalCount: "" });
    setDrawResult(null);
    setDiscardResult(null);
    setMode("home");
  }

  function resetDrawQuiz(nextDifficulty = difficulty) {
    const nextConfig = getDifficulty(nextDifficulty);
    setDrawHand(generateRandomHand(nextConfig.drawQuizSize));
    setDrawAnswer({ typeCount: "", totalCount: "" });
    setDrawResult(null);
    setMode("drawQuiz");
  }

  function submitDrawQuiz() {
    setDrawResult({ analysis: drawAnalysis, answer: drawAnswer });
    setMode("drawResult");
  }

  function resetDiscardQuiz(nextDifficulty = difficulty) {
    const nextConfig = getDifficulty(nextDifficulty);
    setDiscardHand(generateRandomHand(nextConfig.discardQuizSize));
    setDiscardResult(null);
    setMode("discardQuiz");
  }

  function discardTile(tile: TileCode) {
    setDiscardResult({ analysis: discardAnalysis, selectedDiscard: tile });
    setMode("discardResult");
  }

  return (
    <main className="app-shell">
      <header className="top-bar">
        <div className="brand-slot">
          <div className="brand-mark">牌</div>
          <div>
            <p className="eyebrow">Kashiwa Club Ready</p>
            <h1>{APP_NAME}</h1>
          </div>
        </div>
        <button className="ghost-button" type="button" onClick={() => setMode("home")}>
          ホーム
        </button>
      </header>

      {mode === "home" && (
        <section className="home-grid">
          <div className="intro-panel">
            <p className="eyebrow">2つの牌効率トレーニング</p>
            <h2>ツモ前の受け入れと、ツモ後の打牌判断を分けて鍛える。</h2>
            <p>
              4/7/10/13枚では「次に何を引くと進むか」を数字で回答します。
              5/8/11/14枚では実戦と同じように1枚多い手牌から牌をタップして捨て、結果と比較表を確認します。
            </p>
          </div>
          <div className="control-panel">
            <DifficultyPicker difficulty={difficulty} onChange={chooseDifficulty} />
            <div className="mode-actions">
              <button className="primary-button" type="button" onClick={() => resetDrawQuiz()}>
                <Sparkles size={20} />
                有効牌クイズ
              </button>
              <button className="secondary-button" type="button" onClick={() => resetDiscardQuiz()}>
                <MousePointer2 size={20} />
                打牌判断
              </button>
            </div>
          </div>
        </section>
      )}

      {mode === "drawQuiz" && (
        <section className="work-area">
          <ScreenTitle
            title="有効牌クイズ"
            subtitle={`${config.label}: ${config.drawQuizSize}枚 / 次ツモで前進する牌の種類と枚数を答える`}
          />
          <HandView tiles={drawHand} />
          <div className="answer-grid">
            <label>
              有効牌の種類
              <input
                inputMode="numeric"
                value={drawAnswer.typeCount}
                onChange={(event) => setDrawAnswer({ ...drawAnswer, typeCount: event.target.value })}
                placeholder="例: 4"
              />
            </label>
            <label>
              有効牌の合計枚数
              <input
                inputMode="numeric"
                value={drawAnswer.totalCount}
                onChange={(event) => setDrawAnswer({ ...drawAnswer, totalCount: event.target.value })}
                placeholder="例: 14"
              />
            </label>
          </div>
          <div className="button-row">
            <button className="primary-button" type="button" onClick={submitDrawQuiz}>
              回答する
            </button>
            <button className="ghost-button" type="button" onClick={() => resetDrawQuiz()}>
              <RotateCcw size={18} />
              次の問題
            </button>
          </div>
        </section>
      )}

      {mode === "drawResult" && drawResult && (
        <DrawResultView result={drawResult} onNext={() => resetDrawQuiz()} />
      )}

      {mode === "discardQuiz" && (
        <section className="work-area">
          <ScreenTitle
            title="打牌判断"
            subtitle={`${config.label}: ${config.discardQuizSize}枚 / 実戦形式で最も受け入れが広い牌を切る`}
          />
          <HandView tiles={discardHand} onSelect={discardTile} />
          <div className="hint-panel">
            <MousePointer2 size={18} />
            <span>切りたい牌をタップしてください。選択後に正解と全打牌の比較を表示します。</span>
          </div>
        </section>
      )}

      {mode === "discardResult" && discardResult && (
        <DiscardResultView result={discardResult} onNext={() => resetDiscardQuiz()} />
      )}
    </main>
  );
}

function DifficultyPicker({ difficulty, onChange }: { difficulty: Difficulty; onChange: (difficulty: Difficulty) => void }) {
  return (
    <div className="difficulty-picker" aria-label="難易度">
      {DIFFICULTIES.map((item) => (
        <button
          key={item.id}
          type="button"
          disabled={!item.enabled}
          className={difficulty === item.id ? "active" : ""}
          onClick={() => onChange(item.id)}
        >
          {item.label}
          <span>
            {item.drawQuizSize}/{item.discardQuizSize}枚
          </span>
        </button>
      ))}
    </div>
  );
}

function DrawResultView({ result, onNext }: { result: DrawResultState; onNext: () => void }) {
  const isTypeCorrect = Number(result.answer.typeCount) === result.analysis.typeCount;
  const isTotalCorrect = Number(result.answer.totalCount) === result.analysis.totalCount;
  const isCorrect = isTypeCorrect && isTotalCorrect;

  return (
    <section className="work-area">
      <div className={`result-banner ${isCorrect ? "success" : "warning"}`}>
        {isCorrect ? <CheckCircle2 /> : <XCircle />}
        {isCorrect ? "正解です" : "もう一歩です"}
      </div>
      <ScreenTitle
        title="有効牌クイズ結果"
        subtitle={`正解: ${result.analysis.typeCount}種類 / ${result.analysis.totalCount}枚`}
      />
      <div className="effective-list">
        {result.analysis.effectiveTiles.map((tile) => (
          <Tile key={tile} tile={tile} compact />
        ))}
      </div>
      <p className="explanation">{result.analysis.explanation}</p>
      <div className="button-row">
        <button className="primary-button" type="button" onClick={onNext}>
          次の問題
        </button>
      </div>
    </section>
  );
}

function DiscardResultView({ result, onNext }: { result: DiscardResultState; onNext: () => void }) {
  const selectedResult = result.analysis.results.find((item) => item.discard === result.selectedDiscard);
  const isCorrect = result.analysis.bestDiscards.includes(result.selectedDiscard);

  return (
    <section className="work-area">
      <div className={`result-banner ${isCorrect ? "success" : "warning"}`}>
        {isCorrect ? <CheckCircle2 /> : <XCircle />}
        {isCorrect ? "正解です" : "受け入れ最大ではありません"}
      </div>
      <ScreenTitle
        title="打牌判断結果"
        subtitle={`あなたの打牌: ${result.selectedDiscard} / 正解打牌: ${result.analysis.bestDiscards.join(" / ")}`}
      />
      {selectedResult && (
        <div className="status-strip">
          <Metric label="あなたの種類" value={selectedResult.typeCount} />
          <Metric label="あなたの枚数" value={selectedResult.totalCount} />
          <Metric label="最大種類" value={result.analysis.bestResult.typeCount} />
          <Metric label="最大枚数" value={result.analysis.bestResult.totalCount} />
        </div>
      )}
      <div className="effective-list">
        {result.analysis.bestResult.effectiveTiles.map((tile) => (
          <Tile key={tile} tile={tile} compact />
        ))}
      </div>
      <p className="explanation">{result.analysis.bestResult.explanation}</p>
      <ComparisonTable analysis={result.analysis} selectedDiscard={result.selectedDiscard} />
      <div className="button-row">
        <button className="primary-button" type="button" onClick={onNext}>
          次の問題
        </button>
      </div>
    </section>
  );
}

function ComparisonTable({ analysis, selectedDiscard }: { analysis: HandAnalysis; selectedDiscard?: TileCode }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>打牌</th>
            <th>種類</th>
            <th>枚数</th>
            <th>有効牌</th>
          </tr>
        </thead>
        <tbody>
          {analysis.results.map((result) => (
            <tr key={result.discard} className={result.discard === selectedDiscard ? "selected-row" : ""}>
              <td>
                {result.discard}
                {analysis.bestDiscards.includes(result.discard) ? " ◎" : ""}
              </td>
              <td>{result.typeCount}</td>
              <td>{result.totalCount}</td>
              <td>{formatTiles(result.effectiveTiles)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ScreenTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="screen-title">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

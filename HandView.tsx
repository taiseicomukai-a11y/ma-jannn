:root {
  color: #21312a;
  background: #f5fbf4;
  font-family:
    Inter, "Noto Sans JP", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

button,
input {
  font: inherit;
}

button {
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
}

.app-shell {
  width: min(1080px, 100%);
  margin: 0 auto;
  padding: 18px;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0 22px;
}

.brand-slot {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-mark {
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border: 2px solid #1e8b6a;
  border-radius: 8px;
  background: #ffffff;
  color: #12634c;
  font-weight: 800;
  box-shadow: 0 5px 16px rgb(33 49 42 / 10%);
}

.eyebrow {
  margin: 0 0 4px;
  color: #4c7a68;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

h1,
h2,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 0;
  font-size: clamp(1.15rem, 1.8vw, 1.7rem);
}

h2 {
  margin-bottom: 8px;
  font-size: 1.55rem;
}

.home-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  gap: 18px;
  align-items: stretch;
}

.intro-panel,
.control-panel,
.work-area {
  border: 1px solid #d8e9df;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 8px 24px rgb(33 49 42 / 8%);
}

.intro-panel {
  padding: 28px;
}

.intro-panel p:last-child {
  color: #52635b;
  line-height: 1.75;
}

.control-panel {
  display: grid;
  gap: 18px;
  padding: 18px;
}

.difficulty-picker {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.difficulty-picker button {
  min-height: 48px;
  border: 1px solid #c9dfd4;
  border-radius: 8px;
  background: #f6faf8;
  color: #244238;
  font-weight: 700;
}

.difficulty-picker button.active {
  border-color: #1e8b6a;
  background: #e3f6ef;
  color: #12634c;
}

.difficulty-picker button span {
  display: block;
  color: #819188;
  font-size: 0.72rem;
}

.mode-actions,
.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.primary-button,
.secondary-button,
.ghost-button {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  padding: 0 16px;
  font-weight: 800;
}

.primary-button {
  border: 1px solid #137a5c;
  background: #188c69;
  color: #ffffff;
}

.secondary-button {
  border: 1px solid #2e6f9b;
  background: #e7f4fb;
  color: #1f5f86;
}

.ghost-button {
  border: 1px solid #d3e2d9;
  background: #ffffff;
  color: #315145;
}

.primary-button:disabled {
  border-color: #a9bbb2;
  background: #a9bbb2;
}

.work-area {
  display: grid;
  gap: 18px;
  padding: 20px;
}

.screen-title h2 {
  margin-bottom: 4px;
}

.screen-title p {
  margin-bottom: 0;
  color: #65756e;
}

.hand-view {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.tile {
  display: grid;
  width: 56px;
  height: 74px;
  grid-template-rows: 1fr auto;
  align-items: center;
  border: 1px solid #d8dfdc;
  border-radius: 8px;
  background: linear-gradient(180deg, #ffffff 0%, #f3f7f5 100%);
  color: #202a26;
  box-shadow: 0 3px 9px rgb(33 49 42 / 12%);
}

.tile:disabled {
  opacity: 1;
}

.tile-rank {
  font-size: 1.55rem;
  font-weight: 900;
  line-height: 1;
}

.tile-suit {
  padding-bottom: 8px;
  font-size: 0.8rem;
  font-weight: 800;
}

.tile-m .tile-rank,
.tile-m .tile-suit {
  color: #c53939;
}

.tile-p .tile-rank,
.tile-p .tile-suit {
  color: #1e6eb8;
}

.tile-s .tile-rank,
.tile-s .tile-suit {
  color: #12805d;
}

.tile-selected {
  border-color: #f2a33a;
  outline: 3px solid #ffe1a8;
  transform: translateY(-3px);
}

.tile-compact {
  width: 42px;
  height: 56px;
}

.tile-compact .tile-rank {
  font-size: 1.1rem;
}

.tile-compact .tile-suit {
  padding-bottom: 5px;
  font-size: 0.68rem;
}

.answer-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 220px));
  gap: 12px;
}

label {
  display: grid;
  gap: 6px;
  color: #40544b;
  font-weight: 800;
}

input {
  min-height: 44px;
  border: 1px solid #cdded5;
  border-radius: 8px;
  padding: 0 12px;
  background: #fbfdfc;
}

.result-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  padding: 14px;
  font-weight: 900;
}

.result-banner.success {
  background: #e0f7ec;
  color: #12634c;
}

.result-banner.warning {
  background: #fff1d8;
  color: #8a5513;
}

.effective-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.explanation {
  margin: 0;
  color: #40544b;
  line-height: 1.7;
}

.table-wrap {
  overflow-x: auto;
  border: 1px solid #d8e9df;
  border-radius: 8px;
}

table {
  width: 100%;
  min-width: 560px;
  border-collapse: collapse;
}

th,
td {
  border-bottom: 1px solid #edf4f0;
  padding: 11px 12px;
  text-align: left;
}

th {
  background: #f4faf7;
  color: #3d6555;
  font-size: 0.9rem;
}

tr:last-child td {
  border-bottom: 0;
}

.selected-row td {
  background: #fff8e8;
}

.status-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.metric {
  display: grid;
  gap: 2px;
  border: 1px solid #d8e9df;
  border-radius: 8px;
  padding: 10px;
  background: #f8fcfa;
}

.metric span {
  color: #63786e;
  font-size: 0.78rem;
  font-weight: 800;
}

.metric strong {
  color: #1f4638;
  font-size: 1.2rem;
}

.drawn-box,
.hint-panel {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #40544b;
  font-weight: 800;
}

.hint-panel {
  border: 1px solid #d7e7f0;
  border-radius: 8px;
  padding: 12px;
  background: #f0f8fc;
}

code {
  border-radius: 5px;
  padding: 2px 5px;
  background: #edf5f1;
  color: #12634c;
}

@media (max-width: 720px) {
  .app-shell {
    padding: 12px;
  }

  .home-grid,
  .answer-grid,
  .status-strip {
    grid-template-columns: 1fr;
  }

  .top-bar {
    align-items: flex-start;
  }

  .difficulty-picker {
    grid-template-columns: 1fr;
  }

  .tile {
    width: 50px;
    height: 68px;
  }
}

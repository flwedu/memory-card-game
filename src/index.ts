import { CardList } from "./components/CardList";
import { GameController } from "./GameController";
import "./styles/index.scss";
import { generateCardsArrayWithDoubleLength } from "./util/generate-cards";

document.addEventListener("DOMContentLoaded", () => {
  loadForm();

  const settingsForm = document.querySelector<HTMLFormElement>("#game-settings form");
  settingsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(settingsForm);
    const gameSize = Number(formData.get("size"));
    startGame(gameSize);
  });
});

function loadForm() {
  document.getElementById("game-settings").style.display = "";
  document.getElementById("game-hud").style.display = "none";
  document.getElementById("progress-bar-container").style.display = "none";
  document.getElementById("card-list").style.display = "none";

  renderBestScores();
}

function renderBestScores() {
  const el = document.getElementById("best-scores");
  if (!el) return;

  const sizes = [4, 6, 8, 10];
  const entries = sizes
    .map((size) => {
      const raw = localStorage.getItem(`memory-game-best-time-${size}`);
      if (!raw) return null;
      const secs = parseInt(raw, 10);
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${size} pairs: ${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    })
    .filter(Boolean);

  if (entries.length === 0) {
    el.innerHTML = "";
    return;
  }

  el.innerHTML = `
    <div class="best-scores-list">
      <strong>Best Times</strong>
      ${entries.map((e) => `<span>${e}</span>`).join("")}
    </div>
  `;
}

function startGame(gameSize: number) {
  const cardListEl = document.getElementById("card-list") as HTMLDivElement;

  document.getElementById("game-settings").style.display = "none";
  document.getElementById("game-hud").style.display = "";
  document.getElementById("progress-bar-container").style.display = "";

  const cards = generateCardsArrayWithDoubleLength(gameSize);
  const cardList = new CardList(cardListEl, cards);

  // wrongMovesEl is kept for test compatibility; the HUD span is updated in GameController
  const wrongMovesEl = document.getElementById("wrong-moves");
  const gameController = new GameController(cardList, cards, wrongMovesEl);

  cardList.render();

  cardListEl.style.display = "";
  gameController.start();
}

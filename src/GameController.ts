import { Card } from './components/Card';
import { CardList } from './components/CardList';

export class GameController {
  private wrongMoves = 0;
  private totalMoves = 0;
  private seconds = 0;
  private timerInterval: ReturnType<typeof setInterval> | null = null;

  constructor(
    private cardList: CardList,
    private cardsArr: Card[],
    private wrongMovesEl: HTMLElement
  ) {}

  private get gameSize(): number {
    return this.cardsArr.length / 2;
  }

  add1WrongMove() {
    this.wrongMoves++;
    this.wrongMovesEl.innerHTML = `<p>Wrong moves: ${this.wrongMoves}</p>`;
    const el = document.getElementById('wrong-moves-value');
    if (el) el.textContent = String(this.wrongMoves);
  }

  private incrementMoves() {
    this.totalMoves++;
    const el = document.getElementById('total-moves-value');
    if (el) el.textContent = String(this.totalMoves);
  }

  private updateProgress() {
    const total = this.cardsArr.length;
    const matched = this.cardsArr.filter((c) => c.isMatched()).length;
    const pct = (matched / total) * 100;
    const bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = `${pct}%`;
  }

  private startTimer() {
    this.timerInterval = setInterval(() => {
      this.seconds++;
      const el = document.getElementById('timer-value');
      if (el) el.textContent = this.formatTime(this.seconds);
    }, 1000);
  }

  private stopTimer() {
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private formatTime(secs: number): string {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  private getBestTime(): number | null {
    try {
      const stored = localStorage.getItem(`memory-game-best-time-${this.gameSize}`);
      return stored !== null ? parseInt(stored, 10) : null;
    } catch {
      return null;
    }
  }

  private saveBestTime() {
    try {
      const current = this.getBestTime();
      if (current === null || this.seconds < current) {
        localStorage.setItem(`memory-game-best-time-${this.gameSize}`, String(this.seconds));
      }
    } catch {
      // localStorage unavailable (e.g. test environment)
    }
  }

  start() {
    this.startTimer();
    const cardListEl = this.cardList.getEl();

    cardListEl.addEventListener('click', (e) => {
      if (this.cardList.checkTwoSelectedCards()) return;

      let el = e.target as HTMLElement;
      if (el.tagName === 'IMG') {
        el = el.closest('.card');
      }
      if (el.classList.contains('card')) {
        const cardIndex = Number(el.getAttribute('data-index'));
        const card = this.cardsArr[cardIndex];

        this.cardList.addToSelectedCards(card);

        if (this.cardList.checkTwoSelectedCards()) {
          this.incrementMoves();
          const match = this.cardList.checkSelectedCardsMatch();

          if (match) {
            this.updateProgress();
            if (this.cardList.getUnmatchedCards().length === 0) {
              this.updateProgress();
              this.gameOver();
            }
          } else {
            this.add1WrongMove();
            this.cardList.shakeSelectedCards();
          }
        }
      }
    });
  }

  gameOver() {
    this.stopTimer();
    this.saveBestTime();

    this.wrongMovesEl.style.display = 'none';

    const hud = document.getElementById('game-hud');
    if (hud) hud.style.display = 'none';

    const progressContainer = document.getElementById('progress-bar-container');
    if (progressContainer) progressContainer.style.display = 'none';

    const accuracy =
      this.totalMoves > 0
        ? Math.round(((this.totalMoves - this.wrongMoves) / this.totalMoves) * 100)
        : 100;

    const prevBest = this.getBestTime();
    const isNewBest = prevBest === this.seconds;
    const bestTimeHtml =
      prevBest !== null
        ? `<div class="best-time-badge">Best: <strong>${this.formatTime(prevBest)}</strong>${isNewBest ? ' 🏆' : ''}</div>`
        : '';

    setTimeout(() => {
      document.getElementById('app').innerHTML = `
        <div class="game-over">
          <h1>Game over! ${isNewBest ? '🏆' : '🎉'}</h1>
          <div class="stats">
            <div class="stat">
              <span class="stat-label">Time</span>
              <span class="stat-value">${this.formatTime(this.seconds)}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Moves</span>
              <span class="stat-value">${this.totalMoves}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Wrong</span>
              <span class="stat-value">${this.wrongMoves}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Accuracy</span>
              <span class="stat-value">${accuracy}%</span>
            </div>
          </div>
          ${bestTimeHtml}
          <button id="restart" onClick="history.go(0);">Play Again</button>
        </div>
      `;
    }, 1500);
  }
}

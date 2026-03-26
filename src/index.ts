import { CardList } from './components/CardList';
import { GameController } from './GameController';
import './styles/index.scss';
import { generateCardsArrayWithDoubleLength } from './util/generate-cards';

document.addEventListener('DOMContentLoaded', () => {
  loadForm();

  const settingsForm = document.querySelector<HTMLFormElement>('#game-settings form');
  settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(settingsForm);

    const gameSize = Number(formData.get('size'));
    startGame(gameSize);
  });
});

function loadForm() {
  document.getElementById('game-settings').style.display = '';
  document.getElementById('wrong-moves').style.display = 'none';
  document.getElementById('card-list').style.display = 'none';
}

function startGame(gameSize: number) {
  const cardListEl = document.getElementById('card-list') as HTMLDivElement;
  document.getElementById('wrong-moves').style.display = '';
  document.getElementById('game-settings').style.display = 'none';

  const cards = generateCardsArrayWithDoubleLength(gameSize);
  const cardList = new CardList(cardListEl, cards);
  const gameController = new GameController(cardList, cards, document.getElementById('wrong-moves'));
  cardList.render();

  cardListEl.style.display = '';
  gameController.start();
}

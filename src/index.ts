import $ from 'jquery';
import CardList from './components/CardList';
import { GameController } from './GameController';
import './styles/index.scss';
import { generateCardsArrayWithDoubleLength } from './util/generate-cards';

// DOM ready
$(function () {
  loadForm();

  const settingsForm: JQuery<HTMLFormElement> = $('#game-settings form');
  settingsForm.on('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(settingsForm[0]);

    const gameSize = Number(formData.get('size'));
    startGame(gameSize);
  });
});

function loadForm() {
  $('#game-settings').show();
  $('#wrong-moves').hide();
  $('#card-list').hide();
}

function startGame(gameSize: number) {
  const cardListEl: JQuery<HTMLDivElement> = $('#card-list');
  $('#wrong-moves').show();
  $('#game-settings').hide();

  const cards = generateCardsArrayWithDoubleLength(gameSize);
  const cardList = new CardList(cardListEl.get(0), cards);
  const gameController = new GameController(cardList, cards, $('#wrong-moves'));
  cardList.render();

  cardListEl.show();
  gameController.start();
}

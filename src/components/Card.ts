import Component from "./Component";

export default class Card implements Component {
  private flipped: boolean = false;
  private frontImgUrl: string;
  private backImgUrl: string = "assets/0.png";
  private el: HTMLDivElement = document.createElement("div");
  private innerImgEl: HTMLImageElement = document.createElement("img");

  constructor(private value: number, public index: number) {
    this.el.dataset.index = index.toString();
    this.frontImgUrl = `assets/${this.value}.jpg`;
    this.el.className = "card";
    this.innerImgEl.src = this.backImgUrl;

    this.el.appendChild(this.innerImgEl);
  }

  getValue(): number {
    return this.value;
  }

  render(): string {
    return this.el.innerHTML;
  }

  getEl(): HTMLDivElement {
    return this.el;
  }

  flip() {
    this.innerImgEl.src = this.frontImgUrl;
    this.el.classList.add("flipped");
    this.flipped = true;
  }

  unFlip() {
    this.innerImgEl.src = this.backImgUrl;
    this.el.classList.remove("flipped");
    this.flipped = false;
  }

  checkMatch(card: Card): boolean {
    return this.value === card.getValue();
  }

  setMatched() {
    this.el.classList.add("matched");
  }

  isMatched(): boolean {
    return this.el.classList.contains("matched");
  }

  isFlipped(): boolean {
    return this.flipped;
  }

  checkEquals(card: Card): boolean {
    return this.index === card.index;
  }
}

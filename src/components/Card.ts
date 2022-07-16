import Component from "./Component";

export default class Card implements Component {
  public flipped: boolean = false;
  private value: number;
  private frontImgUrl: string;
  private backImgUrl: string = "assets/0.png";
  private el: HTMLDivElement = document.createElement("div");
  private innerImgEl: HTMLImageElement = document.createElement("img");

  constructor(value: number, index: number) {
    this.value = value;
    this.el.dataset.index = index.toString();
    this.frontImgUrl = `assets/${this.value}.jpg`;
    this.el.className = "card";
    this.innerImgEl.src = this.backImgUrl;

    this.el.appendChild(this.innerImgEl);
  }

  getValue(): number {
    return this.value;
  }

  render(): HTMLDivElement {
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
}

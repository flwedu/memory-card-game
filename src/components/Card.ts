import { Component } from "./Component";

export class Card implements Component {
  private flipped: boolean = false;
  private frontImgUrl: string;
  private backImgUrl: string = "assets/0.png";
  private el: HTMLDivElement = document.createElement("div");

  constructor(
    private value: number,
    public index: number,
  ) {
    this.el.dataset.index = index.toString();
    this.frontImgUrl = `assets/${this.value}.jpg`;
    this.el.className = "card";

    const inner = document.createElement("div");
    inner.className = "card-inner";

    // Back face — shown by default
    const backFace = document.createElement("div");
    backFace.className = "card-face card-back";
    const backImg = document.createElement("img");
    backImg.src = this.backImgUrl;
    backFace.appendChild(backImg);

    // Front face — preloaded, revealed on flip
    const frontFace = document.createElement("div");
    frontFace.className = "card-face card-front";
    const frontImg = document.createElement("img");
    frontImg.src = this.frontImgUrl;
    frontFace.appendChild(frontImg);

    inner.appendChild(backFace);
    inner.appendChild(frontFace);
    this.el.appendChild(inner);
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
    this.flipped = true;
    this.el.classList.add("flipped");
  }

  unFlip() {
    this.flipped = false;
    this.el.classList.remove("flipped");
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

  shake() {
    this.el.classList.add("shaking");
    setTimeout(() => {
      this.el.classList.remove("shaking");
    }, 350);
  }
}

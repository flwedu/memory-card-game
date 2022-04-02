import Component from "./Component";

export default class Card implements Component {

    private defaultImageUrl = "assets/0.png";
    private el = document.createElement("div");
    private innerImgEl = document.createElement("img");
    private flippedImageUrl: string;
    public flipped = false;

    constructor(public readonly gameValue: number) {
        this.flippedImageUrl = `assets/${gameValue}.jpg`

        this.el.className = "card";

        // Inner image
        this.innerImgEl.src = this.defaultImageUrl;
        this.el.appendChild(this.innerImgEl);

        // Event
        this.el.addEventListener("click", () => this.flip());
    }

    render(): void {
    }

    getHtmlElement() {
        return this.el;
    }

    flip() {
        this.innerImgEl.src = this.flippedImageUrl;
        this.el.classList.add("flipped");
        this.flipped = true;
    }

    unflip() {
        this.innerImgEl.src = this.defaultImageUrl;
        this.el.classList.remove("flipped");
        this.flipped = false;
    }
}
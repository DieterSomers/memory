import Card from "./Card";

export default class Memory {
  constructor(lvl = 1) {
    this._lvl = lvl;
    this._icons = [];
    this._ref = null;
    this._one = null;
    this._two = null;
    this._turned = 0;
    this.setUpEvents();
    this.getIcons();
  }

  genHTML() {
    document.body.insertAdjacentHTML("afterbegin", `<div class="grid"></div>`);
    return document.querySelector(".grid");
  }

  getIcons() {
    fetch("../../icons/selection.json")
      .then((response) => response.json())
      .then((data) => {
        this._icons = data.icons.map((el) => el.properties.name);
        this.startLvl();
      })
      .catch(console.log);
  }

  startLvl = () => {
    this._ref = this.genHTML();
    const uniqueIcons = this._icons.slice(0, Math.pow(2, this._lvl));
    const allIcons = [...uniqueIcons, ...uniqueIcons].sort(
      () => Math.random() - 0.5
    );
    console.log(allIcons);
    console.log(this._ref);
    allIcons.forEach((name) => new Card(this._ref, name));
  };

  setUpEvents() {
    window.addEventListener("flip", (e) => {
      if (!this._one) {
        this._one = e.detail;
      } else {
        this._two = e.detail;
        this.compareCards();
      }
    });
  }

  compareCards() {
    if (this._two._icon === this._one._icon) {
      this._one.block();
      this._two.block();
      this._one = null;
      this._two = null;
      this._turned++;
      if (this._turned === Math.pow(2, this._lvl)) this.showNextLvl();
    } else {
      this._one.unFlip();
      this._two.unFlip();
      this._one = null;
      this._two = null;
    }
  }

  showNextLvl = () => {
    this._ref.insertAdjacentHTML(
      "afterend",
      `<div class="nextLvl">Go To Next Level</div>`
    );
    document.body
      .querySelector(".nextLvl")
      .addEventListener("click", this.toNextLvl);
  };

  toNextLvl = () => {
    document.body.innerHTML = "";
    this._lvl++;
    this._turned = 0;
    this.startLvl();
  };
}

export default class Card {
  constructor(holder, icon) {
    this._holder = holder;
    this._icon = icon;
    this._ref = this.genHTML();
    this.setUpEvents();
  }

  genHTML() {
    document.querySelector(this._holder).insertAdjacentHTML(
      "beforeend",
      `<div class="card">
          <div class="flipper">
            <div class="front">
              <svg class="icon">
                <use xlink:href="./icons/symbol-defs.svg#icon-${this._icon}"></use>
              </svg>
            </div>
            <div class="back"></div>
          </div>
        </div>`
    );
    return document.querySelector(".card:last-child");
  }

  setUpEvents() {
    this._ref.addEventListener("click", this.flip);
  }

  flip = () => {
    this._ref.classList.toggle("flipped");
  };
}

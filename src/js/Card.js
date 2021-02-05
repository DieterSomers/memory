export default class Card {
  constructor(holder, icon) {
    this._holder = holder;
    this._icon = icon;
    this._ref = this.genHTML();
    this._flipEvent = new CustomEvent("flip", { detail: this });
    this._flipped = false;
    this.setUpEvents();
  }

  genHTML() {
    this._holder.insertAdjacentHTML(
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
    if (!this._flipped) {
      this._ref.classList.add("flipped");
      dispatchEvent(this._flipEvent);
      this._flipped = true;
    }
  };

  unFlip = () => {
    setTimeout(() => {
      this._ref.classList.remove("flipped");
      this._flipped = false;
    }, 2000);
  };

  block = () => {
    setTimeout(() => {
      this._ref.style.opacity = 0.2;
    }, 2000);
  };
}

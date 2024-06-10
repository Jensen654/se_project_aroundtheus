export default class Popup {
  constructor(popupSelector) {
    this._popupElement = popupSelector;

    this._closeButton = this._popupElement.querySelector(".modal__close");

    this._modalContainer =
      this._popupElement.querySelector(".js-modalContainer");

    this._submitButton = this._popupElement.querySelector(".modal__button");

    this._boundHandleEscapeClose = this._handleEscapeClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._boundHandleEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._boundHandleEscapeClose);
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("click", () => {
      this.close();
    });

    this._modalContainer.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
}

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = popupSelector;
  }

  open() {
    this._popupElement.classList.add("modal_opened");
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscapeClose);
    // this._handleEscapeClose();
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscapeClose.bind(this));
  }
}

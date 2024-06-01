import Popup from "./Popup";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, handleDeleteCardFormSubmit) {
    super(popupSelector);

    this._handleDeleteCardFormSubmit = handleDeleteCardFormSubmit;

    this._deleteCardForm =
      this._popupElement.querySelector(".modal__container");
  }

  setEventListeners(cardEl) {
    super.setEventListeners();

    this._deleteCardForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteCardFormSubmit(cardEl);
      this.close();
    });
  }
}

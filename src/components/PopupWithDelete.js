import Popup from "./Popup";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, handleDeleteCardFormSubmit) {
    super(popupSelector);

    this._handleDeleteCardFormSubmit = handleDeleteCardFormSubmit;

    this._deleteCardForm =
      this._popupElement.querySelector(".modal__container");

    this._deleteCardButton = this._popupElement.querySelector(".modal__button");
  }

  setEventListeners(cardEl) {
    super.setEventListeners();

    this._deleteCardForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._deleteCardButton.textContent = "Saving...";
      this._handleDeleteCardFormSubmit(cardEl);
      this.close();
    });
  }
}

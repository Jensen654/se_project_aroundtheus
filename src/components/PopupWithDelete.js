import Popup from "./Popup";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._deleteCardForm =
      this._popupElement.querySelector(".modal__container");

    this._deleteCardButton = this._popupElement.querySelector(".modal__button");
  }

  setEventListeners() {
    super.setEventListeners();

    this._deleteCardForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._deleteCardButton.textContent = "Saving...";
      this._handleDeleteCardFormSubmit();
      this.close();
    });
  }

  setSubmitAction(action) {
    this._handleDeleteCardFormSubmit = action;
  }
}

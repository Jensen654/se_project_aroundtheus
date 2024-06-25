import Popup from "./Popup";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, loadingButtonText) {
    super(popupSelector);
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._buttonText = this._submitButton.textContent;
    this._loadingButtonText = loadingButtonText;
  }

  showLoading() {
    this._submitButton.textContent = this._loadingButtonText;
  }

  hideLoading() {
    this._submitButton.textContent = this._buttonText;
  }

  setEventListeners() {
    super.setEventListeners();

    this._modalContainer.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteFormSubmit();
    });
  }

  setSubmitAction(action) {
    this._handleDeleteFormSubmit = action;
  }
}

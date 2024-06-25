import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, loadingButtonText) {
    super(popupSelector);
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._handleFormSubmit = handleFormSubmit;
    this._buttonText = this._submitButton.textContent;

    this._loadingButtonText = loadingButtonText;

    this._popupForm = this._popupElement.querySelector(
      ".modal__container-form"
    );

    this._inputList = this._popupElement.querySelectorAll(
      ".modal__container-input"
    );
  }

  showLoading() {
    this._submitButton.textContent = this._loadingButtonText;
  }

  hideLoading() {
    this._submitButton.textContent = this._buttonText;
  }

  _getInputValues() {
    const data = {};

    this._inputList.forEach((input) => {
      data[input.name] = input.value;
    });

    return data;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formData = this._getInputValues();
      this._handleFormSubmit(formData);
      // this._popupForm.reset();
    });
  }
}

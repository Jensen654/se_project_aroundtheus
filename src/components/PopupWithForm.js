import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._popupForm = this._popupElement.querySelector(
      ".modal__container-form"
    );

    this._closeButton = this._popupElement.querySelector(".modal__close");

    this._formElement = this._popupElement.querySelector(".modal__container");
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    const cardTitle = this._popupElement.querySelector(".js-modalName");
    const cardDescription = this._popupElement.querySelector(
      ".js-modalDescription"
    );

    const data = { title: cardTitle, description: cardDescription };
    return data;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formData = this._getInputValues();
      this._handleFormSubmit(formData);
    });

    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("click", () => {
      this.close();
    });

    this._formElement.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
}

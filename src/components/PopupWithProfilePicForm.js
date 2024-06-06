import Popup from "./Popup.js";

export default class PopupWithProfilePicForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;

    this._popupForm = this._popupElement.querySelector(
      ".modal__container-form"
    );

    this._inputList = this._popupElement.querySelector(
      ".modal__container-input"
    );
  }

  _getInputValues() {
    const data = this._inputList.value;
    return data;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formData = this._getInputValues();
      this._handleFormSubmit(formData);
      this._popupForm.reset();
    });
  }
}

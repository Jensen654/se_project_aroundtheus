export default class FormValidator {
  constructor(options, formElement) {
    this._options = options;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;

    this._formElement = formElement;
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _checkFormValidity() {
    return Array.from(this._inputEls).every((input) => input.validity.valid);
  }

  toggleButtonState() {
    let foundInvalid = !this._checkFormValidity();

    if (foundInvalid) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _setEventListeners(inputEl) {
    inputEl.addEventListener("input", () => {
      this._checkInputValidity(inputEl);
      this.toggleButtonState();
    });
  }

  enableValidation() {
    this._inputEls = this._formElement.querySelectorAll(this._inputSelector);
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._inputEls.forEach((inputEl) => {
      this._setEventListeners(inputEl, this._submitButton);
    });
  }
}

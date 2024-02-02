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

  _toggleButtonState(inputEl, submitButton) {
    let foundInvalid = false;

    if (!inputEl.validity.valid) {
      foundInvalid = true;
    }

    if (foundInvalid) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  _setEventListeners(inputEl, submitButton) {
    inputEl.addEventListener("input", () => {
      this._checkInputValidity(inputEl);
      this._toggleButtonState(inputEl, submitButton);
    });
  }

  enableValidation() {
    const inputEls = this._formElement.querySelectorAll(this._inputSelector);
    const submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    inputEls.forEach((inputEl) => {
      this._setEventListeners(inputEl, submitButton);
    });
  }
}

// const options = {
//   formSelector: ".modal__container-form",
//   inputSelector: ".modal__container-input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "modal__input_error",
//   errorClass: "modal__error_visible",
// };

// const editFormValidator = new FormValidator(options, editForm);
// const addFormValidator = new FormValidator(options, addForm);

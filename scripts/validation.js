// enabling validation by calling enableValidation()
// pass all the settings on call

const config = {
  formSelector: ".modal__container-form",
  inputSelector: ".modal__container-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_error",
  errorClass: "modal__error_visible",
};

function toggleButtonState(inputEls, submitButton, options) {
  let foundInvalid = false;
  inputEls.forEach((inputEl) => {
    if (!inputEl.validity.valid) {
      foundInvalid = true;
    }
  });

  if (foundInvalid) {
    submitButton.classList.add(options.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(options.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function showInputError(formEl, inputEl, options) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(options.inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(options.errorClass);
}

function hideInputError(formEl, inputEl, options) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(options.inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(options.errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function setEventListeners(formEl, options) {
  const inputEls = [...formEl.querySelectorAll(options.inputSelector)]; //[...] is the same as Array.from
  const submitButton = formEl.querySelector(options.submitButtonSelector);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)]; //[...] is the same as Array.from
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formEl, options);

    //look for all inputs inside of form
    //loop through all inputs and validate
    //if input not valid,
    //get validation message
    //add error class to input
    //display error message
    //disable button
    //if input is valid
    //enable button
    //reset error messages
  });
}

enableValidation(config);

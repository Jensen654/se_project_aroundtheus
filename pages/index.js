import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//Main Selectors
const editCardModal = document.querySelector("#card-modal");
const editProfileModal = document.querySelector("#edit-modal");
const profileEditForm = editProfileModal.querySelector(
  ".modal__container-form"
);
const cardEditForm = editCardModal.querySelector(".modal__container-form");
const previewImageModal = document.querySelector("#image-modal");
//Buttons
const profileEditButton = document.querySelector(".profile__edit-button");
const editSaveButton = editProfileModal.querySelector(".modal__button");
const editModalClose = editProfileModal.querySelector(".modal__close");
const cardModalClose = editCardModal.querySelector(".modal__close");
const addNewCard = document.querySelector(".profile__add-button");
const imageModalClose = previewImageModal.querySelector(".modal__close");
//Form Data
const modalProfileName = document.querySelector(".js-modalName");
const modalProfileDescription = document.querySelector(".js-modalDescription");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardTitleInput = editCardModal.querySelector(".js-modalName");
const cardUrlInput = editCardModal.querySelector(".js-modalUrl");
//Card template
const cardTemplate =
  document.querySelector(".card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
//Modals
const modals = Array.from(document.querySelectorAll(".js_modals"));
const modalImage = previewImageModal.querySelector(".modal__container-image");
const profileContainer = document.querySelector(".js-modalProfileContainer");
const addCardContainer = document.querySelector(".js-modalAddCardContainer");

//FormValidator class
const options = {
  formSelector: ".modal__container-form",
  inputSelector: ".modal__container-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(options, profileEditForm);
const addFormValidator = new FormValidator(options, cardEditForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

//PopupWithImage
const popupPreviewImage = new PopupWithImage(previewImageModal);

//PopupWithForm
const popupProfileForm = new PopupWithForm(
  editProfileModal,
  handleProfileFormSubmit
);
const popupCardForm = new PopupWithForm(editCardModal, handleCardFormSubmit);

//
//Section Class
// const section = new Section({ initialCards, renderCard }, cardListEl);

//
//Functions
function fillProfileInputs() {
  modalProfileName.value = profileName.textContent;
  modalProfileDescription.value = profileDescription.textContent;
}

function handleProfileFormSubmit(data) {
  profileName.textContent = data.title.value;
  profileDescription.textContent = data.description.value;

  popupProfileForm.close();
}

function handleCardFormSubmit(data) {
  const name = data.title.value;
  const link = data.description.value;
  renderCard({ name, link });
  // closeModal(editCardModal);
  popupCardForm.close();
  cardEditForm.reset();
  addFormValidator.toggleButtonState();
}

function handleImageClick(data) {
  // const previewImage = previewImageModal.querySelector(".modal__image");
  // const previewDescription = previewImageModal.querySelector(
  //   ".modal__image-description"
  // );

  // openModal(previewImageModal);
  popupPreviewImage.open(data);
  popupPreviewImage.setEventListeners();
  // document.querySelector("#image-modal").classList.add("modal_opened");
  //   previewImage.src = data.link;
  //   previewImage.alt = data.name;
  //   previewDescription.textContent = data.name;
}

function renderCard(cardData) {
  const cardElement = new Card(
    cardData,
    ".card-template",
    handleImageClick
  ).returnCardElement();
  cardListEl.prepend(cardElement);
}

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", closeByEscape);
// }

// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", closeByEscape);
// }

//
//Event Listeners
profileEditButton.addEventListener("click", function (event) {
  fillProfileInputs();
  // openModal(editProfileModal);
  popupProfileForm.open();
  popupProfileForm.setEventListeners();
});

editModalClose.addEventListener("click", (event) => {
  // closeModal(editProfileModal);
  popupProfileForm.close();
});

addNewCard.addEventListener("click", (event) => {
  // openModal(editCardModal);
  popupCardForm.open();
  popupCardForm.setEventListeners();
});

cardModalClose.addEventListener("click", (event) => {
  // closeModal(editCardModal);
  popupCardForm.close();
});

// profileEditForm.addEventListener("submit", handleProfileFormSubmit);

// cardEditForm.addEventListener("submit", handleCardFormSubmit);

imageModalClose.addEventListener("click", (event) => {
  // closeModal(previewImageModal);
  popupPreviewImage.close();
});

previewImageModal.addEventListener("click", (event) => {
  // closeModal(previewImageModal);
  popupPreviewImage.close();
});

editCardModal.addEventListener("click", (event) => {
  // closeModal(editCardModal);
  popupCardForm.close();
});

editProfileModal.addEventListener("click", (event) => {
  // closeModal(editProfileModal);
  popupProfileForm.close();
});

modalImage.addEventListener("click", (event) => {
  event.stopPropagation();
});

profileContainer.addEventListener("click", (event) => {
  event.stopPropagation();
});

addCardContainer.addEventListener("click", (event) => {
  event.stopPropagation();
});

//Rendering Cards
initialCards.forEach((card) => {
  renderCard(card);
});

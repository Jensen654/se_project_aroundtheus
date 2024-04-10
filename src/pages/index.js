import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

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

//
//Class instantiators

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

//PopupWithImage Class
const popupPreviewImage = new PopupWithImage(previewImageModal);

//PopupWithForm Class
const popupProfileForm = new PopupWithForm(
  editProfileModal,
  handleProfileFormSubmit
);
const popupCardForm = new PopupWithForm(editCardModal, handleCardFormSubmit);
popupProfileForm.setEventListeners();
popupCardForm.setEventListeners();

//Section Class
const section = new Section(
  { items: initialCards, renderer: renderCard },
  cardListEl
);
section.renderItems();

//UserInfo Class
const userClass = new UserInfo({
  nameSelector: profileName,
  descriptionSelector: profileDescription,
});

//
//Functions
function fillProfileInputs() {
  // modalProfileName.value = profileName.textContent;
  // modalProfileDescription.value = profileDescription.textContent;
  userClass.getUserInfo();
}

function handleProfileFormSubmit(data) {
  // profileName.textContent = data.title.value;
  // profileDescription.textContent = data.description.value;
  userClass.setUserInfo();

  popupProfileForm.close();
}

function handleCardFormSubmit(data) {
  const name = data.title.value;
  const link = data.description.value;
  renderCard({ name, link });
  popupCardForm.close();
  cardEditForm.reset();
  addFormValidator.toggleButtonState();
}

function handleImageClick(data) {
  popupPreviewImage.open(data);
  popupPreviewImage.setEventListeners();
}

function renderCard(cardData) {
  const cardElement = new Card(
    cardData,
    ".card-template",
    handleImageClick
  ).returnCardElement();
  section.addItem(cardElement);
}

//
//Event Listeners
profileEditButton.addEventListener("click", function (event) {
  fillProfileInputs();
  popupProfileForm.open();
});

editModalClose.addEventListener("click", (event) => {
  popupProfileForm.close();
});

addNewCard.addEventListener("click", (event) => {
  popupCardForm.open();
});

cardModalClose.addEventListener("click", (event) => {
  popupCardForm.close();
});

imageModalClose.addEventListener("click", (event) => {
  popupPreviewImage.close();
});

previewImageModal.addEventListener("click", (event) => {
  popupPreviewImage.close();
});

editCardModal.addEventListener("click", (event) => {
  popupCardForm.close();
});

editProfileModal.addEventListener("click", (event) => {
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

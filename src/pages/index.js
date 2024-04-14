import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import { initialCards, options } from "../utils/constants.js";

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
const addNewCard = document.querySelector(".profile__add-button");
//Form Data
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = editProfileModal.querySelector("#modal-name");
const profileDescriptionInput =
  editProfileModal.querySelector("#modal-description");

//Card template
const cardListEl = document.querySelector(".cards__list");

//
//Class instantiators

//FormValidator class
const editFormValidator = new FormValidator(options, profileEditForm);
const addFormValidator = new FormValidator(options, cardEditForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

//PopupWithImage Class
const popupPreviewImage = new PopupWithImage(previewImageModal);
popupPreviewImage.setEventListeners();

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
  const inputs = userClass.getUserInfo();

  profileNameInput.value = inputs.profileName;
  profileDescriptionInput.value = inputs.profileDescription;
}

function handleProfileFormSubmit() {
  userClass.setUserInfo({
    nameInput: profileNameInput,
    descriptionInput: profileDescriptionInput,
  });

  popupProfileForm.close();
}

function handleCardFormSubmit(data) {
  const name = data.title;
  const link = data.description;
  renderCard({ name, link });
  popupCardForm.close();
  cardEditForm.reset();
  addFormValidator.toggleButtonState();
}

function handleImageClick(data) {
  popupPreviewImage.open(data);
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

addNewCard.addEventListener("click", (event) => {
  popupCardForm.open();
});

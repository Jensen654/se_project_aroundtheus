import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import { initialCards, options } from "../utils/constants.js";
import Api from "../components/Api.js";
import PopupWithDelete from "../components/PopupWithDelete.js";

//Main Selectors
const editCardModal = document.querySelector("#card-modal");
const editProfileModal = document.querySelector("#edit-modal");
const profileEditForm = editProfileModal.querySelector(
  ".modal__container-form"
);
const cardEditForm = editCardModal.querySelector(".modal__container-form");
const previewImageModal = document.querySelector("#image-modal");
const deleteCardModal = document.querySelector("#trash-modal");
const profileImageModal = document.querySelector("#profile-image-modal");
//Buttons
const profileEditButton = document.querySelector(".profile__edit-button");
const profileImageEditButton = document.querySelector(
  ".profile__image_edit-button"
);
const addNewCard = document.querySelector(".profile__add-button");
const modalClose = document.querySelector(".card__trash-button");
//Form Data
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = editProfileModal.querySelector("#modal-name");
const profileDescriptionInput =
  editProfileModal.querySelector("#modal-description");

//Card template
const cardListEl = document.querySelector(".cards__list");
const cardTrashButton = document.querySelector(".card__trash-button");

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
const popupProfileImageForm = new PopupWithForm(
  profileImageModal,
  handleProfileImageFormSubmit
);
popupProfileForm.setEventListeners();
popupCardForm.setEventListeners();
popupProfileImageForm.setEventListeners();

//PopupWithDelete Class
const popupWithDeleteCard = new PopupWithDelete(
  deleteCardModal,
  handleDeleteCardFormSubmit
);

//UserInfo Class
const userClass = new UserInfo({
  nameContainer: profileName,
  descriptionContainer: profileDescription,
});

//Api Class
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "1755563a-df02-4ecd-aa91-5c5958bedadf",
    "Content-Type": "application/json",
  },
});

api.getInitialCards().then((res) => console.log(res));

//Section Class
const section = new Section({ renderer: renderCard }, cardListEl);

api.getInitialCards().then((cardItems) => {
  section.renderItems(cardItems);
});

api.getProfileInfo().then((res) => {
  return userClass.setUserInfo({
    nameInput: res.name,
    descriptionInput: res.about,
  });
});

// initialCards.forEach((card) => {
//   api.addCard(card);
// });

//
//Functions
function fillProfileInputs() {
  const inputs = userClass.getUserInfo();

  profileNameInput.value = inputs.profileName;
  profileDescriptionInput.value = inputs.profileDescription;
}

function handleProfileFormSubmit(data) {
  userClass.setUserInfo({
    nameInput: data.title,
    descriptionInput: data.description,
  });

  api.updateProfileInfo({
    name: data.title,
    about: data.description,
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
  api.addCard({ name: name, link: link });
}

function handleDeleteCardFormSubmit(cardEl) {
  api.deleteCard(cardEl._id);
  cardEl.remove();
}

function handleProfileImageFormSubmit(data) {}

function handleImageClick(data) {
  popupPreviewImage.open(data);
}

function handleDeleteClick(cardEl) {
  popupWithDeleteCard.open();
  popupWithDeleteCard.setEventListeners(cardEl);
}

function handleLikeClick(cardId) {
  api.toggleCardLike(cardId);
}

function renderCard(cardData) {
  const cardElement = new Card(
    cardData,
    ".card-template",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
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

profileImageEditButton.addEventListener("click", () => {
  popupProfileImageForm.open();
});

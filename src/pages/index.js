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
import PopupWithProfilePicForm from "../components/PopupWithProfilePicForm.js";

//Main Selectors
const editCardModal = document.querySelector("#card-modal");
const editProfileModal = document.querySelector("#edit-modal");
const profileImageModal = document.querySelector("#profile-image-modal");
const profileEditForm = editProfileModal.querySelector(
  ".modal__container-form"
);
const cardEditForm = editCardModal.querySelector(".modal__container-form");
const profileImageEditForm = profileImageModal.querySelector(
  ".modal__container-form"
);
const previewImageModal = document.querySelector("#image-modal");
const deleteCardModal = document.querySelector("#trash-modal");
const profilePic = document.querySelector(".profile__image");
//Buttons
const profileEditButton = document.querySelector(".profile__edit-button");
const profileImageEditButton = document.querySelector(
  ".profile__image_edit-button"
);
const addNewCard = document.querySelector(".profile__add-button");
//Form Data
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = editProfileModal.querySelector("#modal-name");
const profileDescriptionInput =
  editProfileModal.querySelector("#modal-description");
const profilePicModalInput = profileImageModal.querySelector(
  ".modal__container-input"
);
const addCardButton = editCardModal.querySelector(".modal__button");
const editProfileButton = editProfileModal.querySelector(".modal__button");
const deleteCardButton = deleteCardModal.querySelector(".modal__button");
//Card template
const cardListEl = document.querySelector(".cards__list");

//
//Class instantiators

//FormValidator class
const editFormValidator = new FormValidator(options, profileEditForm);
const addFormValidator = new FormValidator(options, cardEditForm);
const profilePicFormValidator = new FormValidator(
  options,
  profileImageEditForm
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
profilePicFormValidator.enableValidation();

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

//PopupWithProfilePicForm
const popupProfileImageForm = new PopupWithProfilePicForm(
  profileImageModal,
  handleProfileImageFormSubmit
);
popupProfileImageForm.setEventListeners();

//PopupWithDelete Class
const popupWithDeleteCard = new PopupWithDelete(
  deleteCardModal,
  handleDeleteCardFormSubmit
);
popupWithDeleteCard.setEventListeners();

//UserInfo Class
const userInfo = new UserInfo({
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

//Section Class
const section = new Section({ renderer: renderCard }, cardListEl);

api.getInitialCards().then((cardItems) => {
  section.renderItems(cardItems);
});

api.getProfileInfo().then((res) => {
  profilePic.src = res.avatar;

  return userInfo.setUserInfo({
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
  const inputs = userInfo.getUserInfo();

  profileNameInput.value = inputs.profileName;
  profileDescriptionInput.value = inputs.profileDescription;
}

function handleProfileFormSubmit(data) {
  api
    .updateProfileInfo({
      name: data.title,
      about: data.description,
    })
    .then(() => {
      userInfo.setUserInfo({
        nameInput: data.title,
        descriptionInput: data.description,
      });
      popupProfileForm.close();
      setTimeout(() => {
        editProfileButton.textContent = "Save";
      }, 500);
    });
}

function handleCardFormSubmit(data) {
  const name = data.title;
  const link = data.description;
  api.addCard({ name: name, link: link }).then(() => {
    renderCard({ name, link });
    popupCardForm.close();
    cardEditForm.reset();
    addFormValidator.toggleButtonState();
    setTimeout(() => {
      addCardButton.textContent = "Create";
    }, 500);
  });
  // renderCard({ name, link });
  // popupCardForm.close();
  // cardEditForm.reset();
  // addFormValidator.toggleButtonState();
}

function handleDeleteCardFormSubmit(cardEl) {
  api.deleteCard(cardEl._id).then(() => {
    cardEl.remove();
    setTimeout(() => {
      deleteCardButton.textContent = "Yes";
    }, 500);
  });
}

function handleProfileImageFormSubmit(data) {
  profilePic.src = profilePicModalInput.value;

  api.updateProfilePic(data);

  popupProfileImageForm.close();
}

function handleImageClick(data) {
  popupPreviewImage.open(data);
}

function handleDeleteClick(cardEl) {
  popupWithDeleteCard.open();
  // call handleDeleteCard...
  popupWithDeleteCard.setSubmitAction(() => {
    // handle deletion
    api.deleteCard(cardEl._id).then(() => {
      cardEl.remove();
      setTimeout(() => {
        deleteCardButton.textContent = "Yes";
      }, 500);
    });
  });

  // call setEventListeners on instantiation
  // popupWithDeleteCard.setEventListeners(cardEl);
}

function handleLikeClick(cardId) {
  api.toggleCardLike(cardId);
}

function handleDislikeClick(cardId) {
  api.toggleCardDislike(cardId);
}

function renderCard(cardData) {
  const cardElement = new Card(
    cardData,
    ".card-template",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    handleDislikeClick
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

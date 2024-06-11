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

//Card template
const cardListEl = document.querySelector(".cards__list");
//Other
const loadingButtonText = "Saving...";

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
  handleProfileFormSubmit,
  loadingButtonText
);
const popupCardForm = new PopupWithForm(
  editCardModal,
  handleCardFormSubmit,
  loadingButtonText
);
const popupProfileImageForm = new PopupWithForm(
  profileImageModal,
  handleProfileImageFormSubmit,
  loadingButtonText
);
popupProfileForm.setEventListeners();
popupCardForm.setEventListeners();
popupProfileImageForm.setEventListeners();

//PopupWithDelete Class
const popupWithDeleteCard = new PopupWithDelete(
  deleteCardModal,
  loadingButtonText
);
popupWithDeleteCard.setEventListeners();

//UserInfo Class
const userInfo = new UserInfo({
  nameContainer: profileName,
  descriptionContainer: profileDescription,
  profilePic,
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

api
  .getInitialCards()
  .then((cardItems) => {
    section.renderItems(cardItems);
  })
  .catch((err) => console.log(err));

api
  .getProfileInfo()
  .then((res) => {
    // profilePic.src = res.avatar;
    userInfo.setAvatar(res.avatar);

    return userInfo.setUserInfo({
      nameInput: res.name,
      descriptionInput: res.about,
    });
  })
  .catch((err) => console.log(err));

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
  popupProfileForm.showLoading();

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
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupProfileForm.hideLoading();
    });
}

function handleCardFormSubmit(data) {
  const name = data.title;
  const link = data.description;
  popupCardForm.showLoading();

  api
    .addCard({ name: name, link: link })
    .then(() => {
      renderCard({ name, link });
      popupCardForm.close();
      cardEditForm.reset();
      addFormValidator.toggleButtonState();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupCardForm.hideLoading();
    });
}

function handleProfileImageFormSubmit(data) {
  popupProfileImageForm.showLoading();

  api
    .updateProfilePic(data)
    .then(() => {
      userInfo.setAvatar(profilePicModalInput.value);
      popupProfileImageForm.close();
      profileImageEditForm.reset();
      addFormValidator.toggleButtonState();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupProfileImageForm.hideLoading();
    });
}

function handleImageClick(data) {
  popupPreviewImage.open(data);
}

function handleDeleteClick(cardEl) {
  popupWithDeleteCard.open();
  popupWithDeleteCard.setSubmitAction(() => {
    popupWithDeleteCard.showLoading();
    return api
      .deleteCard(cardEl._id)
      .then(() => {
        cardEl.remove();
        popupWithDeleteCard.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupWithDeleteCard.hideLoading();
      });
  });
}

function handleLikeButton(card) {
  if (card.isLiked) {
    api
      .toggleCardDislike(card._id)
      .then((res) => card.setIsLiked(res._isLiked))
      .catch((err) => console.log(err));
  } else if (!card.isLiked) {
    api
      .toggleCardLike(card._id)
      .then((res) => card.setIsLiked(res._isLiked))
      .catch((err) => console.log(err));
  }
}

// function handleLikeClick(cardId) {
//   return api.toggleCardLike(cardId);
// }

// function handleDislikeClick(cardId) {
//   return api.toggleCardDislike(cardId);
// }

function renderCard(cardData) {
  const cardElement = new Card(
    cardData,
    ".card-template",
    handleImageClick,
    handleDeleteClick,
    handleLikeButton
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

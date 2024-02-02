import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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

//
//Functions
function fillProfileInputs() {
  modalProfileName.value = profileName.textContent;
  modalProfileDescription.value = profileDescription.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalProfileName.value;
  profileDescription.textContent = modalProfileDescription.value;
  closeModal(editProfileModal);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link });
  closeModal(editCardModal);
  cardEditForm.reset();
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  const previewImage = previewImageModal.querySelector(".modal__image");
  const previewDescription = previewImageModal.querySelector(
    ".modal__image-description"
  );
  cardImage.addEventListener("click", (event) => {
    document.querySelector("#image-modal").classList.add("modal_opened");
  });
  openModal(previewImageModal);
  document.querySelector("#image-modal").classList.add("modal_opened");
}

// function getCardElement(data) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardTitle = cardElement.querySelector(".card__text");
//   const cardImage = cardElement.querySelector(".card__img");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const cardDeleteButton = cardElement.querySelector(".card__trash-button");
//   const previewImage = previewImageModal.querySelector(".modal__image");
//   const previewDescription = previewImageModal.querySelector(
//     ".modal__image-description"
//   );

//   likeButton.addEventListener("click", (event) => {
//     likeButton.classList.toggle("card__like-button_active");
//   });

//   cardDeleteButton.addEventListener("click", (event) => {
//     cardElement.remove();
//   });

//   cardImage.addEventListener("click", (event) => {
//     openModal(previewImageModal);
//     previewImage.src = data.link;
//     previewImage.alt = data.name;
//     previewDescription.textContent = data.name;
//   });

//   cardImage.src = data.link;
//   cardImage.alt = data.name;
//   cardTitle.textContent = data.name;

//   return cardElement;
// }

function renderCard(cardData) {
  const cardElement = new Card(
    cardData,
    ".card-template",
    handleImageClick
  ).returnCardElement();
  cardListEl.prepend(cardElement);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

//
//Event Listeners
profileEditButton.addEventListener("click", function (event) {
  fillProfileInputs();
  openModal(editProfileModal);
});

editModalClose.addEventListener("click", (event) => {
  closeModal(editProfileModal);
});

addNewCard.addEventListener("click", (event) => {
  openModal(editCardModal);
});

cardModalClose.addEventListener("click", (event) => {
  closeModal(editCardModal);
});

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

cardEditForm.addEventListener("submit", handleCardFormSubmit);

imageModalClose.addEventListener("click", (event) => {
  closeModal(previewImageModal);
});

previewImageModal.addEventListener("click", (event) => {
  closeModal(previewImageModal);
});

editCardModal.addEventListener("click", (event) => {
  closeModal(editCardModal);
});

editProfileModal.addEventListener("click", (event) => {
  closeModal(editProfileModal);
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

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal(previewImageModal);
    closeModal(editCardModal);
    closeModal(editProfileModal);
  }
});

//Rendering Cards
initialCards.forEach((card) => {
  const cardElement = new Card(
    card,
    ".card-template",
    handleImageClick
  ).returnCardElement();
  cardListEl.prepend(cardElement);
});
// initialCards.forEach((item) => renderCard(item));

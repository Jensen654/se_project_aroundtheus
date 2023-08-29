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
  editProfileModal.classList.remove("modal_opened");
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link });
  editCardModal.classList.remove("modal_opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__text");
  const cardImage = cardElement.querySelector(".card__img");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__trash-button");
  const previewImage = previewImageModal.querySelector(".modal__image");
  const previewDescription = previewImageModal.querySelector(
    ".modal__image-description"
  );

  likeButton.addEventListener("click", (event) => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardDeleteButton.addEventListener("click", (event) => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", (event) => {
    previewImageModal.classList.add("modal_opened");
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewDescription.textContent = data.name;
  });

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

//
//Event Listeners
profileEditButton.addEventListener("click", function (event) {
  fillProfileInputs();
  editProfileModal.classList.add("modal_opened");
});

editModalClose.addEventListener("click", (event) => {
  editProfileModal.classList.remove("modal_opened");
});

addNewCard.addEventListener("click", (event) => {
  editCardModal.classList.add("modal_opened");
});

cardModalClose.addEventListener("click", (event) => {
  editCardModal.classList.remove("modal_opened");
});

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

cardEditForm.addEventListener("submit", handleCardFormSubmit);

imageModalClose.addEventListener("click", (event) => {
  previewImageModal.classList.remove("modal_opened");
});

//Rendering Cards
initialCards.forEach((item) => renderCard(item));

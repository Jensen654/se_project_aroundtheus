let initialCards = [
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

const profileEditButton = document.querySelector(".profile__edit-button");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal__close");
const modalProfileName = document.querySelector(".js-modalName");
const modalProfileDescription = document.querySelector(".js-modalDescription");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const modalSaveButton = document.querySelector(".modal__button");
const profileEditForm = document.querySelector(".modal__container-form");
const cardTemplate =
  document.querySelector(".card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");

profileEditButton.addEventListener("click", function (event) {
  useCurrentProfileInfo();
  modal.classList.add("modal__opened");
});

modalClose.addEventListener("click", function (event) {
  modal.classList.remove("modal__opened");
});

function useCurrentProfileInfo() {
  modalProfileName.value = profileName.textContent;
  modalProfileDescription.value = profileDescription.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalProfileName.value;
  profileDescription.textContent = modalProfileDescription.value;
  modal.classList.remove("modal__opened");
}

function getCardElement(data) {
  // clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  // access the card title and image and store them in variables
  const cardTitle = cardElement.querySelector(".card__text");
  const cardImage = cardElement.querySelector(".card__img");
  // set the path to the image to the link field of the object
  cardImage.src = data.link;
  // set the image alt text to the name field of the object
  cardImage.alt = data.name;
  // set the card title to the name field of the object, too
  cardTitle.textContent = data.name;
  // return the ready HTML element with the filled-in data
  cardListEl.append(cardElement);
}

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

for (let i = 0; i < initialCards.length; i++) {
  getCardElement(initialCards[i]);
}

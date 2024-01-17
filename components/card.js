export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(".card__trash-button");
  }

  _setEventListeners() {
    this._cardImageElement = this._cardElement.querySelector(".card__img");
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });

    //".card__like-button"
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    //".card__trash-button"
    this._deleteButton.addEventListener("click", () => {
      this._handleTrashIcon();
    });
  }

  _handleTrashIcon() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  returnCardElement() {
    //get card view
    this._cardImg = this._cardElement.querySelector(".card__img");
    this._cardDescription =
      this._cardElement.querySelector(".card__description");

    this._cardImg.src = this._data.link;
    this._cardImg.alt = this._data.name;

    //set event listeners
    this._setEventListeners();
    //return card
  }
}

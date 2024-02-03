export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardImageElement.addEventListener("click", () =>
      this._handleImageClick(this)
    );
    this._likeButton.addEventListener("click", () => this._handleLikeButton());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteButton()
    );
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  returnCardElement() {
    //get card view
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(".card__trash-button");
    this._cardDescription = this._cardElement.querySelector(".card__text");
    this._cardImageElement = this._cardElement.querySelector(".card__img");

    //card image and source
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardDescription.textContent = this._name;

    //set event listeners
    this._setEventListeners();
    //return card
    return this._cardElement;
  }
}

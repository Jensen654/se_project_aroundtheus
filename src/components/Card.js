export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    handleLikeDelete
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._handleLikeDelete = handleLikeDelete;
  }

  _setEventListeners() {
    this._cardImageElement.addEventListener("click", () =>
      this._handleImageClick({ name: this._name, link: this._link })
    );
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
      if (!this._likeButton.classList.contains("card__like-button_active")) {
        this._handleLikeDelete(this._id);
      } else if (
        this._likeButton.classList.contains("card__like-button_active")
      ) {
        this._handleLikeClick(this._id);
      }
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });
  }

  remove() {
    this._cardElement.remove();
    // this._cardElement = null;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _getCardLike() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else if (!this._isLiked) {
      this._likeButton.classList.remove("card__like-button_active");
    }
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

    this._getCardLike();

    //set event listeners
    this._setEventListeners();
    //return card
    return this._cardElement;
  }
}

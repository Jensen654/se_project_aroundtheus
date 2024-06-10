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
    if (!this._isLiked) {
      this._handleLikeClick(this._id)
        .then(() => {
          this._likeButton.classList.add("card__like-button_active");
          this._isLiked = true;
        })
        .catch((err) => console.log(err));
    } else if (this._isLiked) {
      this._handleLikeDelete(this._id)
        .then(() => {
          this._likeButton.classList.remove("card__like-button_active");
          this._isLiked = false;
        })
        .catch((err) => console.log(err));
    }
  }

  setIsLiked(isLiked) {
    this._isLiked = isLiked;
    this._renderLikes();
  }

  isLiked() {
    return this._isLiked;
  }

  _renderLikes() {
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

    this._renderLikes();

    //set event listeners
    this._setEventListeners();
    //return card
    return this._cardElement;
  }
}

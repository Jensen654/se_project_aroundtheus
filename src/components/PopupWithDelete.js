import Popup from "./Popup";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, handleDeleteCard) {
    super(popupSelector);

    this._handleDeleteCard = handleDeleteCard;

    this._deleteCardForm =
      this._popupElement.querySelector(".modal__container");

    // this._cardReference =
  }

  _getPopupCard() {}

  setEventListeners() {
    super.setEventListeners();

    this._deleteCardForm.addEventListener("submit", (evt) => {
      console.log(this);
      evt.preventDefault();
      this._handleDeleteCard(this._id);
      this.close();
    });
  }
}

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._closeButton = this._popupElement.querySelector(".modal__close");

    this._imageElement = this._popupElement.querySelector(
      ".modal__container-image"
    );
  }

  open(data) {
    const previewImage = this._popupElement.querySelector(".modal__image");
    const previewDescription = this._popupElement.querySelector(
      ".modal__image-description"
    );

    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewDescription.textContent = data.name;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();

    this._closeButton.addEventListener("click", (evt) => {
      this.close();
    });

    this._popupElement.addEventListener("click", (event) => {
      this.close();
    });

    this._imageElement.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
}

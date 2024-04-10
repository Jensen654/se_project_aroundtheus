import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
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
}

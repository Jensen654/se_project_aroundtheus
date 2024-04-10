export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameSelector = nameSelector;
    this._descriptionSelector = descriptionSelector;
    this._modalNameSelector = document.querySelector("#modal-name");
    this._modalDescriptionSelector =
      document.querySelector("#modal-description");
  }

  getUserInfo() {
    this._modalNameSelector.value = this._nameSelector.textContent;
    this._modalDescriptionSelector.value =
      this._descriptionSelector.textContent;
  }

  setUserInfo() {
    this._nameSelector.textContent = this._modalNameSelector.value;
    this._descriptionSelector.textContent =
      this._modalDescriptionSelector.value;
  }
}

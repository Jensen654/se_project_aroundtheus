export default class UserInfo {
  constructor({ nameContainer, descriptionContainer }) {
    this._nameContainer = nameContainer;
    this._descriptionContainer = descriptionContainer;
  }

  getUserInfo() {
    const data = {};
    data["profileName"] = this._nameContainer.textContent;
    data["profileDescription"] = this._descriptionContainer.textContent;

    return data;
  }

  setUserInfo(data) {
    this._nameContainer.textContent = data.nameInput;
    this._descriptionContainer.textContent = data.descriptionInput;
  }
}

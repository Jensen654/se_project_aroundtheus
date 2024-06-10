export default class UserInfo {
  constructor({ nameContainer, descriptionContainer, profilePic }) {
    this._nameContainer = nameContainer;
    this._descriptionContainer = descriptionContainer;
    this._profilePic = profilePic;
  }

  getUserInfo() {
    const data = {};
    data["profileName"] = this._nameContainer.textContent;
    data["profileDescription"] = this._descriptionContainer.textContent;

    return data;
  }

  setAvatar(response) {
    this._profilePic.src = response.avatar;
  }

  setUserInfo(data) {
    this._nameContainer.textContent = data.nameInput;
    this._descriptionContainer.textContent = data.descriptionInput;
  }
}

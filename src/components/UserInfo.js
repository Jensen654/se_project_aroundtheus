export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameSelector = nameSelector;
    this._descriptionSelector = descriptionSelector;
    // this._modalNameSelector = document.querySelector("#modal-name");
    // this._modalDescriptionSelector =
    //   document.querySelector("#modal-description");
  }

  getUserInfo() {
    const data = {};
    data["profileName"] = this._nameSelector.textContent;
    data["profileDescription"] = this._descriptionSelector.textContent;

    return data;
    // this._modalNameSelector.value = this._nameSelector.textContent;
    // this._modalDescriptionSelector.value =
    //   this._descriptionSelector.textContent;
  }

  setUserInfo(data) {
    // this._nameSelector.textContent = this._modalNameSelector.value;
    // this._descriptionSelector.textContent =
    //   this._modalDescriptionSelector.value;

    this._nameSelector.textContent = data.nameInput.value;
    this._descriptionSelector.textContent = data.descriptionInput.value;
  }
}

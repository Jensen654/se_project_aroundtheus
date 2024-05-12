export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }

  addCard(body) {
    fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }

  deleteCard(cardId) {
    fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }

  toggleCardLike(cardId) {
    fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }

  updateProfileInfo(body) {
    fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }

  updateProfilePic() {}
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json",
  },
});

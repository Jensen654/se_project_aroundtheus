export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject();
      }
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
      headers: this._headers,
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.isLiked) {
          fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
          });
        } else if (res.isLiked) {
          fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
          });
        }
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

  updateProfilePic(avatar) {
    fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    });
  }
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json",
  },
});

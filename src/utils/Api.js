import token from './data.js';

export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(response) {
    return response.then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка получения данных: ${res.status} ${res.statusText}`));
      })
  }

  /* профиль */
  getProfile() {
    return this._getResponseData(fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: this._headers
      }))
      
  }

  saveProfile(data) {
    return this._getResponseData(fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      }))
  }

  changePhoto(data) {
    return this._getResponseData(fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar
        })
      }))
  }

  /* карточки */
  getInitialCards() {
    return this._getResponseData(fetch(`${this._baseUrl}/cards`, {
        method: 'GET',
        headers: this._headers
      }))
  }

  addCard(item) {
    return this._getResponseData(fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: item.name,
          link: item.link
        })
      }))
  }

  deleteCard(item) {
    return this._getResponseData(fetch(`${this._baseUrl}/cards/${item._id}`, {
        method: 'DELETE',
        headers: this._headers
      }))
  }

  changeLikeCardStatus(item, like) {
    if (like) {
      return this._getResponseData(fetch(`${this._baseUrl}/cards/likes/${item._id}`, {
        method: 'PUT',
        headers: this._headers
      }))
    } else {
      return this._getResponseData(fetch(`${this._baseUrl}/cards/likes/${item._id}`, {
        method: 'DELETE',
        headers: this._headers
      }))
    }
  }

  /** загрузка начальных данных в одном блоке */
  getAllData() {
    return Promise.all([this.getProfile(), this.getInitialCards()]);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});

export default api;
export class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(response) {
    return response.then((res) => {
      console.log('res: ', res);
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка получения данных: ${res.status} ${res.statusText}`));
      })
  }

  register(email, password) {
    return this._getResponseData(fetch(`${this._baseUrl}/signup`, {  
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          "password": password,
          "email": email
        })
      }))
  }


}

const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    //"Authorization" : `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  }
})

export default auth;
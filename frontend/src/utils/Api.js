class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
  }

  // I form a request to the server, if it was not successful, we return an error!
  _handleSendReq(res) {
    if (res.ok) {
      return Promise.resolve(res.json())
    }

    // If an error came, we reject the promise
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  // Method for downloading user information from the server
  async getUser() {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._handleSendReq(response)
  }

  // Method for downloading cards from the server
  async getCards() {
    const response = await fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._handleSendReq(response)
  }

  // Profile editing method
  async editProfileUser(data) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
    return this._handleSendReq(response)
  }

  // User avatar update method
  async updateAvatar(data) {
    const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
    return this._handleSendReq(response)
  }

  // Method for adding a new card from the server
  async addCard(data) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(data),
    })
    return this._handleSendReq(response)
  }

  // Card removal method
  async deletedCard(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._handleSendReq(response)
  }

  // Method for liking a card
  async addLikeCard(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._handleSendReq(response)
  }

  // The method of setting and removing likes from the card
  async deletedLike(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._handleSendReq(response)
  }
}

const api = new Api({
  baseUrl: "https://api.criron.nomoreparties.co",
})

export default api

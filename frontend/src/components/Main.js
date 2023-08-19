import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import Card from "./Card"
import editPen from "../images/icons/profile__edit-avatar.svg"
import Loader from "./Loader"

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="content">
      {props.isLoading && <Loader />}

      <section
        className={`profile ${props.isLoading && "page__profile_hidden"}`}
        aria-label="Профиль"
      >
        <div className="profile__wrapper">
          <div className="profile__wrapper-relative">
            <img
              src={currentUser.avatar}
              alt="Аватар"
              className="profile__avatar"
            />
            <button className="profile__edit-avatar" type="button">
              <img
                className="profile__edit-pen"
                src={editPen}
                alt="изображение ручки редактирования"
                onClick={() => {
                  props.onEditAvatar(true)
                }}
              />
            </button>
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p>
            <button
              type="button"
              className="profile__edit-btn"
              onClick={() => {
                props.onEditProfile(true)
              }}
            ></button>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-btn"
          onClick={() => {
            props.onAddPlace(true)
          }}
        ></button>
      </section>

      <section className="elements">
        <div className="elements__grid">
          {props.cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardDelete={props.onDeletedCard}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onConfirmationPopup={props.onConfirmationPopup}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Main

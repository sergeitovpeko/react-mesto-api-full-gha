import React, { useState, useEffect } from "react"
import {CurrentUserContext} from "../contexts/CurrentUserContext"
import PopupWithForm from "./PopupWithForm"

function EditProfilePopup({
  isOpen,
  onUpdateUser,
  onLoading,
  onClose,
  onCloseOverlay,
}) {
  const currentUser = React.useContext(CurrentUserContext)
  const [about, setAbout] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
    setName(currentUser.name)
    setAbout(currentUser.about)
  }, [currentUser, isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({
      name: name,
      about: about,
    })
  }

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value)
  }

  return (
    <PopupWithForm
      name="popupEditProfile"
      title="Редактировать профиль"
      buttonText={onLoading ? `Сохранение...` : `Сохранить`}
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      onCloseOverlay={onCloseOverlay}
    >
      <label>
        <input
          className="pop-up__input"
          type="text"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={handleChangeName}
          required
        />
        <span
          className="pop-up__input-error name-error"
          id="error-profile"
        ></span>
      </label>
      <label>
        <input
          className="pop-up__input"
          type="text"
          name="about"
          placeholder="Профессия"
          minLength="2"
          maxLength="200"
          value={about || ""}
          onChange={handleChangeAbout}
          required
        />
        <span className="pop-up__input-error description-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup
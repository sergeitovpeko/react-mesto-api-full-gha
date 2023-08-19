import PopupWithForm from "./PopupWithForm"
import React, { useState, useEffect } from "react"

function AddPlacePopup({
  isOpen,
  onAddPlace,
  onLoading,
  onClose,
  onCloseOverlay,
}) {
  const [placeName, setPlaceName] = useState("")
  const [placeLink, setPlaceLink] = useState("")

  useEffect(() => {
    setPlaceName("")
    setPlaceLink("")
  }, [isOpen])

  function handleSubmit(event) {
    event.preventDefault()
    onAddPlace({
      name: placeName,
      link: placeLink,
    })
  }

  function handleChangePlaceName(event) {
    setPlaceName(event.target.value)
  }

  function handleChangePlaceLink(event) {
    setPlaceLink(event.target.value)
  }

  return (
    <PopupWithForm
      name="popupNewPlace"
      title="Новое место"
      buttonText={onLoading ? `Сохранение` : `Создать`}
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
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={placeName}
          onChange={handleChangePlaceName}
          required
        />
        <span
          className="pop-up__input-error place-name-error"
          id="error-place"
        ></span>
      </label>
      <label>
        <input
          className="pop-up__input"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          value={placeLink}
          onChange={handleChangePlaceLink}
          required
        />
        <span className="pop-up__input-error img-link-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup

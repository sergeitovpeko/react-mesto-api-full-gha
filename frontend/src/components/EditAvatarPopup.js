import React, { useEffect } from "react"
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup({
  onLoading,
  onClose,
  onUpdateAvatar,
  isOpen,
  onCloseOverlay,
}) {
  const avatarRef = React.useRef(null)

  useEffect(() => {
    avatarRef.current.value = ""
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  function handleChangeAvatar() {
    return avatarRef.current.value
  }

  return (
    <PopupWithForm
      name="popupEditAvatar"
      title="Обновить аватар"
      buttonText={onLoading ? `Сохранение...` : `Сохранить`}
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      onCloseOverlay={onCloseOverlay}
    >
      <label>
        <input
          className="pop-up__input"
          type="url"
          name="avatar"
          placeholder="Введите ссылку URL"
          onChange={handleChangeAvatar}
          ref={avatarRef}
          required
        />
        <span className="pop-up__input-error inputAvatar-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
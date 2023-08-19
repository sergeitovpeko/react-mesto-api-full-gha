import React from "react"

function PopupWithForm({
  name,
  title,
  buttonText,
  children,
  isOpen,
  onClose,
  onCloseOverlay,
  onSubmit,
}) {
  return (
    <div
      className={`pop-up popup_type_${name} ${isOpen ? "pop-up_opened" : ""}`}
      onClick={onCloseOverlay}
    >
      <div className="pop-up__container">
        <button
          className="pop-up__close-butt"
          type="button"
          onClick={onClose}
        />
        <form className="pop-up__form" name={name} onSubmit={onSubmit}>
          <h2 className="pop-up__title">{title}</h2>
          {children}
          <button className="pop-up__sub-butt" type="submit">
            {buttonText || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
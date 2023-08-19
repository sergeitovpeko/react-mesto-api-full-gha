import React from "react"

function ImagePopup({ card, onClose, onCloseOverlay }) {
  return (
    <div
      className={`img-pop-up pop-up ${card.link ? "pop-up_opened" : ""}`}
      aria-label="Картинка в полный размер"
      onClick={onCloseOverlay}
    >
      <div className="pop-up__img-container">
        <img className="pop-up__image" src={card.link} alt={card.name} />
        <div className="pop-up__caption">{card.name}</div>
        <button
          className="pop-up__close-butt"
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  )
}

export default ImagePopup
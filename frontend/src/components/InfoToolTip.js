import SuccessIcon from "../images/icons/SuccessIcon.svg"
import FailIcon from "../images/icons/FailIcon.svg"
import React from "react"

function InfoToolTip(props) {
  return (
    <div
      className={`pop-up popup_type_tooltip ${
        props.isOpen ? "pop-up_opened" : ""
      }`}
    >
      <div className="pop-up__content">
        {props.isSuccess ? (
          <>
            <img
              src={`${SuccessIcon}`}
              alt="Регистрация прошла успешно."
              className="pop-up__tooltip_image"
            />
            <p className="pop-up__tooltip_message">
              Вы успешно зарегистрировались!
            </p>
          </>
        ) : (
          <>
            <img
              src={`${FailIcon}`}
              alt="Регистрация не была выполнена."
              className="pop-up__tooltip_image"
            />
            <p className="pop-up__tooltip_message">
              Что-то пошло не так. Попробуйте ещё раз!
            </p>
          </>
        )}

        <button
          type="button"
          className="pop-up__close-butt"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  )
}

export default InfoToolTip

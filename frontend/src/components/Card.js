import { useContext } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

function Card(props) {
  const currentUser = useContext(CurrentUserContext)
  const isLiked = props.card.likes.some((user) => user === currentUser._id)

  const likeButtonClassName = `elements__butt ${
    (isLiked && "elements__butt_liked") || ""
  }`

  const isOwner =
    (props.card.owner?._id || props.card.owner) === currentUser._id

  function handleCardClick() {
    props.onCardClick(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
    props.onConfirmationPopup(true)
  }

  return (
    <div className="elements__item">
      {isOwner && (
        <button
          className="elements__bin"
          aria-label="Урна"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="elements__img"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleCardClick}
      />
      <div className="elements__wrapper">
        <h2 className="elements__name">{props.card.name}</h2>
        <div className="elements__container-like">
          <button
            className={likeButtonClassName}
            aria-label="Сердечко"
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="elements__count-like">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card

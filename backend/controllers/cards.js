// Создание константы Card из модели card для дальнейшего
// использования в функциях
const Card = require('../models/card');

// Импорты ошибок из файла errors
const AccessDeniedError = require('../errors/AccessDeniedError');
const NotFoundPageError = require('../errors/NotFoundPageError');
const InvalidDataError = require('../errors/InvalidDataError');

// Получение массива карточек
function getCards(_, res, next) {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
}

// Создание новой карточки
function createNewCard(req, res, next) {
  const { name, link } = req.body;
  const { userId } = req.user;

  Card.create({ name, link, owner: userId })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new InvalidDataError(
            'Переданы некорректные данные при создании карточки',
          ),
        );
      } else {
        next(err);
      }
    });
}

// Лайк на карточки:
function addLikeCard(req, res, next) {
  const { cardId } = req.params;
  const { userId } = req.user;

  Card.findByIdAndUpdate(
    cardId,
    {
      $addToSet: {
        likes: userId,
      },
    },
    {
      new: true,
    },
  )
    .then((card) => {
      if (card) return res.send({ data: card });

      throw new NotFoundPageError('Карточка с указанным id не найдена');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(
          new InvalidDataError(
            'Переданы некорректные данные при добавлении лайка карточке',
          ),
        );
      } else {
        next(err);
      }
    });
}

// Снятие лайка с карточки
function removeLikeCard(req, res, next) {
  const { cardId } = req.params;
  const { userId } = req.user;

  Card.findByIdAndUpdate(
    cardId,
    {
      $pull: {
        likes: userId,
      },
    },
    {
      new: true,
    },
  )
    .then((card) => {
      if (card) return res.send({ data: card });

      throw new NotFoundPageError('Данные по указанному id не найдены');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(
          new InvalidDataError(
            'Переданы некорректные данные при снятии лайка карточки',
          ),
        );
      } else {
        next(err);
      }
    });
}

// Удаление карточки из массива
function deleteCard(req, res, next) {
  const { id: cardId } = req.params;
  const { userId } = req.user;

  Card.findById({
    _id: cardId,
  })
    .then((card) => {
      if (!card) {
        throw new NotFoundPageError('Данные по указанному id не найдены');
      }

      const { owner: cardOwnerId } = card;

      if (cardOwnerId.valueOf() !== userId) {
        throw new AccessDeniedError('Нет прав доступа');
      }

      return Card.findByIdAndDelete(cardId);
    })
    .then((deletedCard) => {
      if (!deletedCard) {
        throw new NotFoundPageError('Карточка уже была удалена');
      }

      res.send({ data: deletedCard });
    })
    .catch(next);
}

module.exports = {
  getCards,
  createNewCard,
  addLikeCard,
  removeLikeCard,
  deleteCard,
};

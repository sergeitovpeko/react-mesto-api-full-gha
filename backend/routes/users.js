// Создание экземпляра роутера Express
const router = require('express').Router();

// Импорт модуля celebrate для валидации запросов

const { celebrate, Joi } = require('celebrate');

// Импорт регулярного выражения для проверки URL
const { regexUrl } = require('../utils/constants');

// Импорт контроллеров для обработки запросов к пользователям
const {
  getUsers,
  getUserById,
  getUserInfo,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

// пользователи
router.get('/', getUsers);

// пользователь
router.get('/me', getUserInfo);

// Конкретный пользователь по его ID:
router.get(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserById,
);

// Редактирование данных пользователя:
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile,
);

// Редактирование аватара пользователя:
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(regexUrl),
    }),
  }),
  updateAvatar,
);

module.exports = router;

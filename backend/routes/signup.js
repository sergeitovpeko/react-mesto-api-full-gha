// Создание экземпляра роутера Express
const router = require('express').Router();

// Импорт модуля celebrate для валидации запросов
const { celebrate, Joi } = require('celebrate');

// Импорт регулярного выражения для валидации URL
const { regexUrl } = require('../utils/constants');

// Импорт контроллера для обработки запроса на регистрацию пользователя
const { registration } = require('../controllers/users');

// Маршрут для регистрации пользователя
router.post(
  '/signup',
  celebrate({
    // Проверка входящих данных с использованием celebrate и Joi
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(regexUrl),
    }),
  }),
  registration,
);

module.exports = router; // Экспорт роутера

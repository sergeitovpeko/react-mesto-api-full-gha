const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/AuthenticationError');

const {
  NODE_ENV,
  SECRET_KEY,
  SECRET_KEY_DEV,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';

  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new AuthenticationError('Неправильные почта или пароль'));
  }
  const token = authorization.replace(bearer, '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : SECRET_KEY_DEV);
  } catch (err) {
    return next(new AuthenticationError('Неправильные почта или пароль'));
  }
  req.user = payload;

  return next();
};

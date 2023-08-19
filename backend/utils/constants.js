const { NODE_ENV, SECRET_KEY, PORT = 3000 } = process.env;

const URL = 'mongodb://127.0.0.1:27017/mestodb';

const SECRET_KEY_DEV = 'dev-secret';

const regexUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports = {
  SECRET_KEY,
  URL,
  regexUrl,
  PORT,
  NODE_ENV,
  SECRET_KEY_DEV,
};

const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.genTokens = (payload, refreshTokenPayload) => {
  const refreshToken = jwt.sign(
    refreshTokenPayload || payload,
    config.get('refreshPublicKey'),
    {
      expiresIn: '7d',
    }
  );

  const accessToken = jwt.sign(payload, config.get('publicKey'), {
    expiresIn: '15min',
  });

  return [accessToken, refreshToken];
};

exports.authCheck = (token) => {
  if (jwt.verify(token, config.get('publicKey'))) {
    return jwt.decode(token);
  }
  return null;
};

exports.comparePasswords = function (password, hash) {
  return bcrypt.compareSync(password, hash);
};

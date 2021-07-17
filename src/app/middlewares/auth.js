const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../../config/auth');
const Users = require('../schema/Users');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const [, token] = authHeader.split(' ');

  if (!token) {
    return res.status(401).json({
      mensagem: 'Não autorizado',
    });
  }

  try {
    const user = await Users.findOne({ token });

    if (!user) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({
      mensagem: 'Sessão expirada',
    });
  }
};

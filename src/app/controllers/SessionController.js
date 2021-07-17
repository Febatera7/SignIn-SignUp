const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('../schema/Users');
const authConfig = require('../../config/auth');

class SessionController {
  async create(req, res) {
    const { email, senha } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
    }

    if (!(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
    }

    const token = jwt.sign({ id: user._id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    await user.updateOne({
      token,
      ultimo_login: new Date(),
    });

    const userUpdated = await Users.findOne({ token });

    let data = new Date(userUpdated.createdAt.valueOf() - userUpdated.createdAt.getTimezoneOffset() * 60000);
    const data_criacao = data.toISOString().replace(/\.\d{3}Z$/, '');

    let data2 = new Date(userUpdated.updatedAt.valueOf() - userUpdated.updatedAt.getTimezoneOffset() * 60000);
    const data_atualizacao = data2.toISOString().replace(/\.\d{3}Z$/, '');
    
    let data3 = new Date(userUpdated.ultimo_login.valueOf() - userUpdated.ultimo_login.getTimezoneOffset() * 60000);
    const ultimo_login = data3.toISOString().replace(/\.\d{3}Z$/, '');

    return res.json({
      id: userUpdated.id,
      nome: userUpdated.nome,
      email: userUpdated.email,
      senha: userUpdated.senha,
      telefones: userUpdated.telefones,
      ultimo_login,
      data_criacao,
      data_atualizacao,
      token: userUpdated.token,
      });
  }
}

module.exports = new SessionController();

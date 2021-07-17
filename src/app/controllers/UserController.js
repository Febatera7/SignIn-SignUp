const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const authConfig = require('../../config/auth');
const Users = require('../schema/Users');

class UserController {
  async create(req, res) {
    const { nome, email, senha, telefones } = req.body;

    const emailExist = await Users.findOne({ email });

    if (emailExist) {
      return res.status(400).json({ mensagem: 'E-mail já existente.' });
    }

    const _id = await crypto.randomBytes(4).toString('HEX');

    const token = await jwt.sign({ _id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const password = await bcrypt.hash(senha, 8);

    const user = await Users.create({
      _id,
      nome,
      email,
      senha: password,
      telefones,
      ultimo_login: new Date(),
      token,
    });

    let data = new Date(user.createdAt.valueOf() - user.createdAt.getTimezoneOffset() * 60000);
    const data_criacao = data.toISOString().replace(/\.\d{3}Z$/, '');

    let data2 = new Date(user.updatedAt.valueOf() - user.updatedAt.getTimezoneOffset() * 60000);
    const data_atualizacao = data2.toISOString().replace(/\.\d{3}Z$/, '');

    let data3 = new Date(user.ultimo_login.valueOf() - user.ultimo_login.getTimezoneOffset() * 60000);
    const ultimo_login = data3.toISOString().replace(/\.\d{3}Z$/, '');

    return res.status(201).json({
      _id: user.id,
      nome: user.nome,
      email: user.email,
      senha: user.senha,
      telefones: user.telefones,
      ultimo_login,
      data_criacao,
      data_atualizacao,
      token: user.token,
    });
  }

  async read(req, res) {
    const user = await Users.findOne({ _id: req.userId });

    let data = new Date(user.createdAt.valueOf() - user.createdAt.getTimezoneOffset() * 60000);
    const data_criacao = data.toISOString().replace(/\.\d{3}Z$/, '');

    let data2 = new Date(user.updatedAt.valueOf() - user.updatedAt.getTimezoneOffset() * 60000);
    const data_atualizacao = data2.toISOString().replace(/\.\d{3}Z$/, '');

    let data3 = new Date(user.ultimo_login.valueOf() - user.ultimo_login.getTimezoneOffset() * 60000);
    const ultimo_login = data3.toISOString().replace(/\.\d{3}Z$/, '');

    return res.status(200).json({
      _id: user._id,
      nome: user.nome,
      email: user.email,
      senha: user.senha,
      telefones: user.telefones,
      ultimo_login,
      data_criacao,
      data_atualizacao,
      token: user.token,
    });
  }
}

module.exports = new UserController();

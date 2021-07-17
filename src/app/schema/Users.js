const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    senha: {
      type: String,
      required: true,
    },
    telefones: [
      {
        ddd: {
          type: Number,
          required: true,
        },
        numero: {
          type: Number,
          required: true,
        },
      },
    ],
    ultimo_login: {
      type: Date,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Users', UsersSchema);

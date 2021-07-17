const faker = require('faker');
const { factory } = require('factory-girl');

const Users = require('../src/app/schema/Users');

factory.define('Users', Users, {
  nome: faker.name.findName(),
  email: faker.internet.email(),
  senha: faker.internet.password(),
  telefones: [
    {
      ddd: faker.random.number({ min: 2, max: 2 }),
      numero: faker.random.number({ min: 9, max: 9 }),
    },
  ],
});

module.exports = factory;

const request = require('supertest');
const app = require('../../src/app');
const factory = require('../factories');

describe('User', () => {
  it('it should be able to register', async () => {
    const user = await factory.attrs('Users');

    const response = await request(app).post('/signup').send(user);

    expect(response.body).toHaveProperty('_id');
  });

  it('it should not be able to register with a  duplicated mail', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        nome: 'Teste unitário',
        email: 'teste@unitario.com',
        senha: '123456',
        telefones: [
          {
            ddd: 11,
            numero: 987654321,
          },
        ],
      });

    expect(response.status).toBe(400);
  });
});

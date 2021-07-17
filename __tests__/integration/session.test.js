const request = require('supertest');
const app = require('../../src/app');

describe('User', () => {
  it('it should be able to signin', async () => {
    const response = await request(app).post('/signin').send({
      email: 'teste@unitario.com',
      senha: '123456',
    });

    expect(response.body).toHaveProperty('_id');
  });

  it('it should not be able to signin with a non-existent email', async () => {
    const response = await request(app).post('/signin').send({
      email: 'error@error.com',
      senha: '123456',
    });

    expect(response.status).toBe(401);
  });

  it('it should not be able to signin if passwords are not the same', async () => {
    const response = await request(app).post('/signin').send({
      email: 'teste@teste.com',
      senha: '1234567',
    });

    expect(response.status).toBe(401);
  });
});

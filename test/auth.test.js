const request = require('supertest');
const app = require('../server');
const { sequelize } = require('../models');

describe('Authentication API', () => {
  let token;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
        role: 'recruiter'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.user).toHaveProperty('email', 'testuser@example.com');
  });

  it('should log in the user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });

    token = res.body.token;
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});

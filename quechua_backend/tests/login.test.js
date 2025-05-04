const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

beforeAll(async () => {
  jest.setTimeout(15000);
  await mongoose.connect('mongodb+srv://rassielperez46:0QeYhTGPvfqFudYI@cluster0.itkzxn2.mongodb.net/quechuaDB');
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Test Suite 2: Login de Usuario', () => {
  test('Login exitoso', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'duplicate@example.com',
        password: 'testpassword'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('Login falla por contraseña incorrecta', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'duplicate@example.com',
        password: 'wrongpassword'
      });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});

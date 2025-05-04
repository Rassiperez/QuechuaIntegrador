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

describe('Test Suite 1: Registro de Usuario', () => {
  test('Registro exitoso', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'user' + Date.now(),
        email: 'user' + Date.now() + '@example.com',
        password: 'testpassword'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message');
  });

  test('Registro duplicado falla', async () => {
    const email = 'duplicate@example.com';

    // Primero registramos el usuario
    await request(app).post('/api/auth/register').send({
      username: 'duplicateUser',
      email: email,
      password: 'testpassword'
    });

    // Intentamos registrarlo de nuevo (fallo esperado)
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'duplicateUser',
        email: email,
        password: 'testpassword'
      });

    expect(res.statusCode).toBe(400);
  });
});

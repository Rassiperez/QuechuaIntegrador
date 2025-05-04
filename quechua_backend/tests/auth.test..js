const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); 

beforeAll(async () => {
 
  await mongoose.connect('mongodb+srv://rassielperez46:0QeYhTGPvfqFudYI@cluster0.itkzxn2.mongodb.net/quechuaDB?retryWrites=true&w=majority');
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('🧪 Pruebas de Autenticación', () => {

  test('Registro exitoso de nuevo usuario', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser1',
        email: 'testuser1@example.com',
        password: 'testpassword'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message');
  });

  test('Login fallido con contraseña incorrecta', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser1@example.com',
        password: 'incorrectpassword'
      });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  test('Login exitoso con credenciales correctas', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser1@example.com',
        password: 'testpassword'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token'); // O 'message' según tu respuesta
  });

});

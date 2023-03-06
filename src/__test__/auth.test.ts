import { PrismaClient, Role } from '@prisma/client';
import { createServer } from '../utils/server';
import bcrypt from 'bcrypt';
import request from 'supertest';
import { server } from '..';
import { db } from '../utils/db/db.server';

const app = createServer();

const mockUser = {
  name: 'jose',
  lastName: 'gonzales',
  email: 'jose@gmail.com',
  password: 'password',
};

describe('Auth endpoints', () => {
  let userId;
  beforeAll(async () => {
    await db.$connect();
  });

  afterAll(async () => {
    await db.user.delete({ where: { id: userId } });
    await db.$disconnect();
    server.close();
  });

  describe('POST /auth/signup', () => {
    it('should return a 201 when register a new user ', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send(mockUser);
      userId = response.body.data.id;
      // Check that the status code of the response is 201.
      expect(response.status).toBe(201);

      //Check that response object has the correct propities
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('name', mockUser.name);
      expect(response.body.data).toHaveProperty('lastName', mockUser.lastName);
      expect(response.body.data).toHaveProperty('email', mockUser.email);
      expect(response.body.data).toHaveProperty('role', Role.CLIENT);
      expect(response.body.data).toHaveProperty('createAt');
      expect(response.body.data).toHaveProperty('updateAt');

      //Check that was create in the data base
      const user = await db.user.findUnique({ where: { id: userId } });
      expect(user).toBeTruthy();
      expect(user.name).toBe(mockUser.name);
      expect(user.lastName).toBe(mockUser.lastName);
      expect(user.email).toBe(mockUser.email);
    });

    it('should return a 400 if try register a user without email', async () => {
      const response = await request(app).post('/api/auth/signup').send({
        name: mockUser.name,
        lastName: mockUser.lastName,
        password: mockUser.password,
      });
      expect(response.status).toBe(400);
    });
  });
  describe('POST /auth/signin', () => {
    it('should log in an existing user', async () => {
      const res = await request(app).post('/api/auth/signin').send({
        email: mockUser.email,
        password: mockUser.password,
      });
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should return a 401 if user does not exist', async () => {
      const res = await request(app).post('/api/auth/signin').send({
        email: 'nonexistinguser@test.com',
        password: 'password',
      });
      expect(res.status).toEqual(401);
    });

    it('should return a 401 if password is incorrect', async () => {
      const res = await request(app).post('/api/auth/signin').send({
        email: mockUser.email,
        password: 'wrongpassword',
      });
      expect(res.status).toEqual(401);
    });
  });
});

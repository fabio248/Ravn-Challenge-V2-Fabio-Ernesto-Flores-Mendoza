import request from 'supertest';
import { app, server } from '../index';
import { db } from '../utils/db/db.server';
import { mockUser } from './auth.test';
import { AuthService } from '../services/auth.service';
describe('Cart endpoints', () => {
  let user;
  let tokenClient;
  const auth = new AuthService();
  beforeAll(async () => {
    await db.$connect();
    user = await db.user.create({ data: mockUser });
    const { token } = auth.signToken(user);
    tokenClient = token;
  });
  afterAll(async () => {
    await db.$disconnect();

    await db.$executeRaw`TRUNCATE TABLE "cart" CASCADE`;
    await db.user.delete({ where: { id: user.id } });
    server.close();
  });
  describe('POST /cart', () => {
    it('should create a new cart for the authenticated user', async () => {
      const res = await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${tokenClient}`);
      expect(res.status).toBe(201);
      expect(res.body.statusCode).toBe(201);
      expect(res.body.message).toBe('created cart');
      expect(res.body.data.userId).toBe(user.id);
    });

    it('should return a 401 error if user is not authenticated', async () => {
      const res = await request(app).post('/api/cart');
      expect(res.status).toBe(401);
    });
  });
});

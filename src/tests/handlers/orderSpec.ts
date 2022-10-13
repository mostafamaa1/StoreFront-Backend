import app from '../../index';
import jwt from 'jsonwebtoken';
import client from '../../config';
import supertest from 'supertest';
import { user, userModel } from '../../models/users';

const store = new userModel();

const request = supertest(app);

describe('orders Endpoint Tests', (): void => {
  const newUser: user = {
    username: 'testUser',
    firstname: 'testName',
    lastname: 'testLastName',
    password: 'test123'
  };

  const token = jwt.sign(newUser, process.env.TOKEN_SECRET as string);

  //Create a new user before all specs run
  beforeAll(async (): Promise<void> => {
    await store.create(newUser as user);
  });

  it('Should create a new order', async (): Promise<void> => {
    const response = await request.post('/orders').send({
      status: 'active',
      user_id: 1
    });
    expect(response.status).toBe(200);
  });

  it('Should get all orders', async (): Promise<void> => {
    const response = await request.get('/orders');
    expect(response.status).toBe(200);
  });

  it('Should get order by id', async (): Promise<void> => {
    const response = await request.get('/orders/1');
    expect(response.status).toBe(200);
  });

  it('Should fail to Update order by id', async (): Promise<void> => {
    const response = await request.put('/orders/1').send({
      id: 1,
      status: 'completed'
    });
    expect(response.status).toBe(401);
  });

  it('Should fail to delete a order by id', async (): Promise<void> => {
    const response = await request.delete('/orders/1');
    expect(response.status).toBe(401);
  });

  describe('Tests Using token', (): void => {
    it('Should show orders by userId with jwt', async () => {
      const response = await request
        .get('/orders/user/1')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it('Should Update a order by id with jwt ', async (): Promise<void> => {
      const response = await request
        .put('/orders/1')
        .send({
          id: 1,
          status: 'completed'
        })
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it('Should delete a user by id with jwt ', async (): Promise<void> => {
      const response = await request
        .delete('/orders/1')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    // Delete users and orders table after all specs is tested
    afterAll(async (): Promise<void> => {
      const conn = await client.connect();
      await conn.query(
        'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;'
      );
      await conn.query(
        'DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;'
      );
      conn.release();
    });
  });
});

import app from '../../index';
import jwt from 'jsonwebtoken';
import client from '../../config';
import supertest from 'supertest';

const request = supertest(app);

const newUser = {
  username: 'testUser',
  firstname: 'testName',
  lastname: 'testLastName',
  password: 'test123'
};

describe('Products Endpoint Tests', (): void => {
  let token = '';

  beforeAll(async (): Promise<void> => {
    // Create a new user before all tests run
    const response = await request.post('/users').send(newUser);
    token = response.body;
  });

  it('Should Fail to create new product', async (): Promise<void> => {
    const response = await request.post('/products').send({
      name: 'testproduct',
      price: 50,
      type: 'hardware'
    });
    expect(response.status).toBe(401);
  });

  it('Should get all products', async (): Promise<void> => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('Should get a product by id', async (): Promise<void> => {
    const response = await request.get('/products/1');
    expect(response.status).toBe(200);
  });

  it('Should fail to Update product by id', async (): Promise<void> => {
    const response = await request.put('/products/1').send({
      name: 'testproduct',
      price: 50,
      type: 'hardware'
    });
    expect(response.status).toBe(401);
  });

  it('Should fail to delete a product by id', async (): Promise<void> => {
    const response = await request.delete('/products/1');
    expect(response.status).toBe(401);
  });

  describe('Tests Using token', (): void => {
    it('Should create a new product with jwt', async (): Promise<void> => {
      const response = await request
        .post('/products')
        .send({
          name: 'testproduct',
          price: 50,
          type: 'hardware'
        })
        .set('Authorization', `Bearer ${token}`);
      console.log('token:', token);
      expect(response.status).toBe(200);
    });

    it('Should Update a product by id with jwt ', async (): Promise<void> => {
      const response = await request
        .put('/products/1')
        .send({
          name: 'testproduct 2',
          price: 70,
          type: 'hardware'
        })
        .set('Authorization', `Bearer ${token}`);
      console.log('token:', token);
      expect(response.status).toBe(200);
    });

    it('Should delete a product by id with jwt ', async (): Promise<void> => {
      const response = await request
        .delete('/products/1')
        .set('Authorization', `Bearer ${token}`);
      console.log('token:', token);
      expect(response.status).toBe(200);
    });

    // Delete users and products table after all specs is tested
    afterAll(async (): Promise<void> => {
      const conn = await client.connect();
      await conn.query(
        'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;'
      );
      await conn.query(
        'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;'
      );
      conn.release();
    });
  });
});

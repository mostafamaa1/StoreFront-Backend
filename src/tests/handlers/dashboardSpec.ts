import app from '../../index';
import jwt from 'jsonwebtoken';
import client from '../../config';
import supertest from 'supertest';
import { order, orderModel } from '../../models/orders';
import { user, userModel } from '../../models/users';
import { product, productModel } from '../../models/products';
import { OrderedProduct, dashboard } from '../../services/dashboard';

const orderStore = new orderModel();
const productStore = new productModel();
const userStore = new userModel();
const board = new dashboard();

const request = supertest(app);

const newOrder: order = {
  user_id: 1,
  status: 'active'
};

const newProduct: product = {
  name: 'laptop',
  price: 500,
  type: 'hardware'
};

const newUser: user = {
  username: 'testUser',
  firstname: 'testName',
  lastname: 'testLastName',
  password: 'test123'
};

const newOrderedProduct: OrderedProduct = {
  order_id: 1,
  product_id: 1,
  quantity: 5
};

const token = jwt.sign(newUser, process.env.TOKEN_SECRET as string);

describe('Dashboard Endpoint Tests', (): void => {
  beforeAll(async (): Promise<void> => {
    // Create a new user before all tests run
    await userStore.create(newUser as user);
    // Create a new order before all tests run
    await orderStore.create(newOrder as order);
    // Create a new order before all tests run
    await productStore.create(newProduct as product);
  });

  it('should fail to add product to existing order', async (): Promise<void> => {
    const response = await request
      .post('/orders/1/products')
      .send(newOrderedProduct);
    expect(response.status).toBe(401);
  });

  it('should fail to return correct products by order id', async (): Promise<void> => {
    const response = await request.get('/orders/1/products');
    expect(response.status).toBe(401);
  });

  describe('Tests Using token', (): void => {
    it('should return correct products by order id', async (): Promise<void> => {
      const response = await request
        .get('/orders/1/products')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it('should add product to existing order', async (): Promise<void> => {
      const response = await request
        .post('/orders/1/products')
        .send({
          order_id: 1,
          product_id: 1,
          quantity: 5
        })
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    // Delete orders, users, products and order_products tables after all specs is tested
    afterAll(async (): Promise<void> => {
      const conn = await client.connect();
      await conn.query(
        'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;'
      );
      await conn.query(
        'DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;'
      );
      await conn.query(
        'DELETE FROM order_products;\n ALTER SEQUENCE order_products_id_seq RESTART WITH 1;'
      );
      await conn.query(
        'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;'
      );
      conn.release();
    });
  });
});

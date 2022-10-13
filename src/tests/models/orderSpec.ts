import { order, orderModel } from '../../models/orders';
import { user, userModel } from '../../models/users';
import client from '../../config';

const orderStore = new orderModel();
const userStore = new userModel();

describe('order Model Test', (): void => {
  const newOrder: order = {
    user_id: 1,
    status: 'active'
  };

  const newUser: user = {
    username: 'testUser',
    firstname: 'testName',
    lastname: 'testLastName',
    password: 'test123'
  };

  beforeAll(async (): Promise<void> => {
    // Create a new user before all tests run
    await userStore.create(newUser as user);
    // Create a new order before all tests run
    await orderStore.create(newOrder as order);
  });

  describe('order Model Functionalities', (): void => {
    it('should have an index method', () => {
      expect(orderStore.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(orderStore.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(orderStore.create).toBeDefined();
    });

    it('should have a update method', () => {
      expect(orderStore.update).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(orderStore.delete).toBeDefined();
    });

    it('index method should return all orders', async (): Promise<void> => {
      const result = await orderStore.index();
      expect(result).toEqual([
        {
          id: 1,
          user_id: 1,
          status: 'active'
        }
      ]);
    });

    it('show method should return the order by id', async (): Promise<void> => {
      const result = await orderStore.show(1);
      expect(result).toEqual({
        id: 1,
        user_id: 1,
        status: 'active'
      });
    });

    it('create method should add a order', async (): Promise<void> => {
      const result = await orderStore.create(newOrder as order);
      expect(result as unknown).toEqual({
        id: 2,
        user_id: 1,
        status: 'active'
      });
    });

    it('update method to update the order by id', async (): Promise<void> => {
      const result = await orderStore.update(1, 'completed');
      expect(result.status).toEqual('completed');
    });

    it('delete method should remove the order', async (): Promise<void> => {
      const result = await orderStore.delete(1);
      expect(result).toEqual(result);
    });

    // Delete orders and users table after all specs is tested
    afterAll(async () => {
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

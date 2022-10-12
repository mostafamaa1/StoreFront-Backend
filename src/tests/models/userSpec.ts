import { user, userModel } from '../../models/users';
import client from '../../config';
const store = new userModel();

describe('User Model Test', (): void => {
  const newUser: user = {
    username: 'testUser',
    firstname: 'testName',
    lastname: 'testLastName',
    password: 'test123'
  };

  beforeAll(async (): Promise<void> => {
    // Create a new user before all tests run
    await store.create(newUser as user);
  });

  describe('User Functionalities', (): void => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(store.create).toBeDefined();
    });

    it('should have a update method', () => {
      expect(store.update).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(store.delete).toBeDefined();
    });

    it('index method should return all users', async (): Promise<void> => {
      const result = await store.index();
      expect(result).toEqual([
        {
          id: 1,
          username: 'testUser',
          firstname: 'testName',
          lastname: 'testLastName'
        }
      ]);
    });

    it('show method should return the user by id', async (): Promise<void> => {
      const result = await store.show(1);
      expect(result).toEqual({
        id: 1,
        username: 'testUser',
        firstname: 'testName',
        lastname: 'testLastName'
      });
    });

    it('create method should add a user', async (): Promise<void> => {
      const result = await store.create(newUser as user);
      expect(result).toEqual([
        {
          id: 2,
          username: 'testUser',
          firstname: 'testName',
          lastname: 'testLastName'
        }
      ]);
    });

    it('update method to update the user by id', async (): Promise<void> => {
      const result = await store.update({
        id: 1,
        username: 'UpdatedUser',
        firstname: 'UpdatedName',
        lastname: 'UpdatedLastName',
        password: '12345678'
      });
      expect(result as unknown).toEqual({
        id: 1,
        username: 'UpdatedUser',
        firstname: 'UpdatedName',
        lastname: 'UpdatedLastName'
      });
    });

    it('delete method should remove the user', async (): Promise<void> => {
      const result = await store.delete(1);

      expect(result).toEqual(result);
    });

    // Delete users table after all specs is tested
    afterAll(async (): Promise<void> => {
      const conn = await client.connect();
      await conn.query(
        'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;'
      );
      conn.release();
    });
  });
});

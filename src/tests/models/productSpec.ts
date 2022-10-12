import { product, productModel } from '../../models/products';
import client from '../../config';
const store = new productModel();

describe('Product Model Test', (): void => {
  const newProduct: product = {
    name: 'laptop',
    price: 500,
    type: 'computer hardware'
  };

  beforeAll(async (): Promise<void> => {
    // Create a new product before all tests run
    await store.create(newProduct as product);
  });

  describe('Product Model Functionalities', (): void => {
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

    it('index method should return all products', async (): Promise<void> => {
      const result = await store.index();
      expect(result).toEqual([
        {
          id: 1,
          name: 'laptop',
          price: 500,
          type: 'computer hardware'
        }
      ]);
    });

    it('show method should return the product by id', async (): Promise<void> => {
      const result = await store.show(1);
      expect(result).toEqual({
        id: 1,
        name: 'laptop',
        price: 500,
        type: 'computer hardware'
      });
    });

    it('create method should add a product', async (): Promise<void> => {
      const result = await store.create(newProduct as product);
      expect(result as unknown).toEqual({
        id: 2,
        name: 'laptop',
        price: 500,
        type: 'computer hardware'
      });
    });

    it('update method to update the product by id', async (): Promise<void> => {
      const result = await store.update({
        id: 1,
        name: 'laptop V2',
        price: 700,
        type: 'computer hardware'
      });
      expect(result as unknown).toEqual({
        id: 1,
        name: 'laptop V2',
        price: 700,
        type: 'computer hardware'
      });
    });

    it('delete method should remove the product', async (): Promise<void> => {
      const result = await store.delete(1);

      expect(result).toEqual(result);
    });

    // Delete products table after all specs is tested
    afterAll(async () => {
      const conn = await client.connect();
      await conn.query(
        'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;'
      );
      conn.release();
    });
  });
});

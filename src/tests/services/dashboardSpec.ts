import { order, orderModel } from '../../models/orders';
import { user, userModel } from '../../models/users';
import { product, productModel } from '../../models/products';
import { OrderedProduct, dashboard } from '../../services/dashboard';
import client from '../../config';

const orderStore = new orderModel();
const productStore = new productModel();
const userStore = new userModel();
const board = new dashboard();

describe('Dashboard Test', (): void => {
  const newOrder: order = {
    user_id: 1,
    status: 'active'
  };

  const newProduct: product = {
    name: 'laptop',
    price: 500,
    type: 'computer hardware'
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

  beforeAll(async (): Promise<void> => {
    // Create a new user before all tests run
    await userStore.create(newUser as user);
    // Create a new order before all tests run
    await orderStore.create(newOrder as order);
    // Create a new order before all tests run
    await productStore.create(newProduct as product);
    // add a new product to existing order before all tests run
    await board.addProduct(newOrderedProduct as OrderedProduct);
  });

  it('should have addProduct method', () => {
    expect(board.addProduct).toBeDefined();
  });
  it('should have showProducts method', () => {
    expect(board.showProducts).toBeDefined();
  });
  it('should add product to existing order by id', async (): Promise<void> => {
    const order = await board.addProduct(newOrderedProduct);
    expect(order as unknown).toEqual([
      {
        id: 2,
        order_id: 1,
        product_id: 1,
        quantity: 5
      }
    ]);
  });
  it('should return products list', async (): Promise<void> => {
    const products = await board.showProducts(1);
    expect(products as unknown).toEqual([
      {
        id: 1,
        status: 'active',
        user_id: 1,
        quantity: 5,
        order_id: 1,
        product_id: 1
      },
      {
        id: 2,
        status: 'active',
        user_id: 1,
        quantity: 5,
        order_id: 1,
        product_id: 1
      }
    ]);
  });

  // Delete orders, users, products and order_products tables after all specs is tested
  afterAll(async () => {
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

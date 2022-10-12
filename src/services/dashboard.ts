import client from '../config';

export type OrderedProduct = {
  id?: number;
  user_id?: number;
  status?: string;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class dashboard {
  // addproduct method takes in order_id, product_id and quantity then returns the added product
  async addProduct(op: OrderedProduct): Promise<OrderedProduct[]> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [
        op.quantity,
        op.order_id,
        op.product_id
      ]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error adding product to existing order. Error: ${err}`);
    }
  }
  // showProducts method selects the inner join between order table and order_products table and returns order based on order_id
  async showProducts(id: number): Promise<OrderedProduct[]> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT * FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE orders.id = $1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not show products with order_id ${id}. Error: ${err}`
      );
    }
  }
}

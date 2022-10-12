import client from '../config';

export type product = {
  id?: number;
  name: string;
  price: number;
  type: string;
};

export class productModel {
  // Gets All products
  async index(): Promise<product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  // Show products by id
  async show(id: number): Promise<product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  // Create method takes name, price and type and returns the entered product
  async create(p: product): Promise<product> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO products (name, price, type) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [p.name, p.price, p.type]);
      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new product. Error: ${err}`);
    }
  }
  // Update products by id
  async update(p: product): Promise<product> {
    try {
      const conn = await client.connect();
      const sql =
        'UPDATE products SET name = $1, price = $2, type = $3 WHERE id = $4 RETURNING *';

      const result = await conn.query(sql, [p.name, p.price, p.type, p.id]);

      const product = result.rows[0];
      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Unable to edit Product (${p.name}): ${err}`);
    }
  }

  // Delete products by id
  async delete(id: number): Promise<product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}

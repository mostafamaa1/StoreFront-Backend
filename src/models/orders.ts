import client from '../config';

export type order = {
  id?: number;
  status: string;
  user_id: number;
};

export class orderModel {
  //Show All Orders
  async index(): Promise<order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  //Show Order By order id
  async show(id: number): Promise<order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  //Show Order By user ID
  async showByUserID(id: number): Promise<order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      const result = await conn.query(sql, [id]);
      const order = result.rows;
      conn.release();
      return order;
    } catch (error) {
      throw new Error(`Unable to get the order error: ${error}`);
    }
  }

  /* //Show active Order By user ID
    async showActiveStatus(user_id: number, status: string): Promise<order[]> {
      try {
        const conn = await client.connect()
        const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)'
        const result = await conn.query(sql, [user_id, status])
        const order = result.rows
        conn.release()
        return order
      } catch (err) {
        throw new Error(`Could not get the order error: ${err}`)
      }
    }
  
    //Show completed Order By user ID
    async showCompleteStatus(user_id: number, status: string): Promise<order[]> {
      try {
        const conn = await client.connect()
        const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)'
        const result = await conn.query(sql, [user_id, status])
        const order = result.rows
        conn.release()
        return order
      } catch (err) {
        throw new Error(`Could not get the order error: ${err}`)
      }
    } */

  // Create order and return entered order content
  async create(o: order): Promise<order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';

      const result = await conn.query(sql, [o.status, o.user_id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  //Update Order by id
  async update(id: number, status: string): Promise<order> {
    try {
      const conn = await client.connect();
      const sql = 'UPDATE orders SET status=($2) WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id, status]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to update order: ${err}`);
    }
  }

  //Delete Order by id
  async delete(id: number): Promise<order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}

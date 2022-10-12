import client from '../config';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pepper: string = process.env.BCRYPT_PASSWORD as string;
const saltRounds: number = parseInt(process.env.SALT_ROUNDS as string);

// User type
export type user = {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
  password?: string;
};

// User model with all crud actions
export class userModel {
  // Gets All users
  async index(): Promise<user[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT id, username, firstname, lastname FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not show all users. Error: ${err}`);
    }
  }

  // Create method takes username, firstname, lastname and password and returns created user
  async create(u: user): Promise<user[]> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (username, firstname, lastname, password_hash) VALUES($1, $2, $3, $4) RETURNING id, username, firstname, lastname';
      const password_hash = bcrypt.hashSync(u.password + pepper, saltRounds);

      const result = await conn.query(sql, [
        u.username,
        u.firstname,
        u.lastname,
        password_hash
      ]);
      const user = result.rows;

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not create user. Error: ${err}`);
    }
  }

  // Show users by id
  async show(id: number): Promise<user> {
    try {
      const conn = await client.connect();
      const sql = `SELECT id, username, firstname, lastname FROM users WHERE id = $1`;
      const result = await client.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user: ${err}`);
    }
  }

  // Authenticate user by username and password
  async auth(username: string, password: string): Promise<user> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE username=($1)';

      const result = await conn.query(sql, [username]);

      console.log(password + pepper);

      if (result.rows.length) {
        const user = result.rows[0];

        if (bcrypt.compareSync(password + pepper, user.password_hash)) {
          return user;
        }
      }
      throw new Error('Password incorrect');
    } catch (err) {
      throw new Error(`Could not authenticate user: ${err}`);
    }
  }

  // Update users by id
  async update(u: user): Promise<user> {
    try {
      const conn = await client.connect();
      const sql =
        'UPDATE users SET username = $1, firstname = $2, lastname = $3, password_hash = $4 WHERE id = $5 RETURNING id, username, firstname, lastname;';
      const hash = bcrypt.hashSync(u.password + pepper, saltRounds);

      const result = await conn.query(sql, [
        u.username,
        u.firstname,
        u.lastname,
        hash,
        u.id
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update user: ${err}`);
    }
  }

  // delete users by id
  async delete(id: number): Promise<user> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM users WHERE id = $1 RETURNING *';
      const result = await client.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user: ${err}`);
    }
  }
}

import express, { Request, Response } from 'express';
import { user, userModel } from '../models/users';
import jwt from 'jsonwebtoken';
import { verifyAuthToken } from '../middlewares/verifyToken';
import dotenv from 'dotenv';

dotenv.config();

//User Routes
export const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.post('/users', create);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users/auth', auth);
  app.put('/users/:id', verifyAuthToken, update);
  app.delete('/users/:id', verifyAuthToken, destroy);
};

// Token Secret
const secret: string = process.env.TOKEN_SECRET as string;

//User model class
const store = new userModel();

// index method Shows all users
const index = async (_req: Request, res: Response) => {
  const users = await store.index();

  res.json(users);
};

// create method create new user
const create = async (req: Request, res: Response) => {
  const user: user = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  };

  try {
    const newUser = await store.create(user);
    const token = jwt.sign({ newUser }, secret);

    res.json(token);
  } catch (err) {
    res.status(400);
    res.json({ error: `User was not created: ${err}` });
  }
};

// show method inputs id to model then send selected user as response
const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(parseInt(req.params.id));

    res.json(user);
  } catch (err) {
    res.status(500);
    res.json({ error: `Could not get user: ${err}` });
  }
};

// Auth method checks user entered values with the one stored in the database
const auth = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const newUser = await store.auth(username, password);

    res.json(newUser);
  } catch (err) {
    res.status(500);
    res.json({ error: `Could not authenticate user: ${err}` });
  }
};

// update method updates user information
const update = async (req: Request, res: Response) => {
  const user: user = {
    id: req.body.id,
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  };

  try {
    const updatedUser = await store.update(user);

    res.json(updatedUser);
  } catch (err) {
    res.status(500);
    res.json({ error: `Could not update user: ${err}` });
  }
};

// destroy method deletes user by id
const destroy = async (req: Request, res: Response) => {
  try {
    const deletedUser = await store.delete(parseInt(req.params.id));
    res.json(deletedUser);
  } catch (err) {
    res.status(500);
    res.json({ error: `Could not delete user: ${err}` });
  }
};

export default userRoutes;

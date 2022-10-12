import express, { Request, Response } from 'express';
import { order, orderModel } from '../models/orders';
import { verifyAuthToken } from '../middlewares/verifyToken';

//Order Routes
export const orderRoutes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.get('/orders/user/:id', verifyAuthToken, showByUserID);
  // app.get('/orders/active', verifyAuthToken, getActiveStatus);
  // app.get('/orders/completed', verifyAuthToken, getCompleteStatus);
  app.post('/orders', create);
  app.put('/orders/:id', verifyAuthToken, update);
  app.delete('/orders/:id', verifyAuthToken, destroy);
};

//order model import
const store = new orderModel();

// index method Shows all orders
const index = async (_req: express.Request, res: express.Response) => {
  const orders = await store.index();
  res.json(orders);
};

// show method inputs id to model then send selected order as response
const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(parseInt(req.params.id));
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json({ error: `Could not show order by id: ${err}` });
  }
};

// show method inputs id to model then send selected order as response
const showByUserID = async (req: Request, res: Response) => {
  try {
    const orderByUser = await store.showByUserID(parseInt(req.params.id));
    res.json(orderByUser);
  } catch (err) {
    res.status(400);
    res.json({ error: `Could not show order by user id: ${err}` });
  }
};

/* 
const getActiveStatus = async (req: Request, res: Response) => {
  try {
    const newOrder: order = {
      id: undefined as unknown as number,
      status: 'active',
      user_id: req.body.user_id,
    }
    const orderByStatus = await store.showActiveStatus(newOrder)
    return res.json(orderByStatus)
  } catch (err) {
    res.status(400);
    res.json({ error: `Could not show order by id: ${err}` });
  }
}

const getCompleteStatus = async (req: Request, res: Response) => {
  try {
    const newOrder: order = {
      id: undefined as unknown as number,
      status: 'completed',
      user_id: req.body.user_id,
    }
    const orderByStatus = await store.showCompleteStatus(newOrder)
    return res.json(orderByStatus)
  } catch (err) {
    res.status(400);
    res.json({ error: `Could not show order by id: ${err}` });
  }
} */

// create method takes order info from request and passes it to model then returns created order
const create = async (req: Request, res: Response) => {
  try {
    const newOrder: order = {
      user_id: req.body.user_id,
      status: req.body.status
    };

    const order = await store.create(newOrder);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json({ error: `Could not create order: ${err}` });
  }
};

// update method updates order information
const update = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const status = req.body.status;
    const updatedOrder = await store.update(id, status);
    res.send(updatedOrder);
  } catch (err) {
    res.status(500);
    res.json({ error: `Could not update order: ${err}` });
  }
};

// destroy method deletes order by id
const destroy = async (req: Request, res: Response) => {
  try {
    const deletedUser = await store.delete(parseInt(req.params.id));
    res.json(deletedUser);
  } catch (err) {
    res.status(500);
    res.json({ error: `Could not delete order: ${err}` });
  }
};

export default orderRoutes;

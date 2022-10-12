import express, { Request, Response } from 'express';
import { product, productModel } from '../models/products';
import { verifyAuthToken } from '../middlewares/verifyToken';

//Product routes
const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.put('/products/:id', verifyAuthToken, update);
  app.delete('/products/:id', verifyAuthToken, destroy);
};

// Product model class
const store = new productModel();

// index method Shows all products
const index = async (req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

// show method inputs id to model then send selected product as response
const show = async (req: Request, res: Response) => {
  try {
    const products = await store.show(parseInt(req.params.id));
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json({ error: `Could not get product: ${err}` });
  }
};

// create method create new product
const create = async (req: Request, res: Response) => {
  try {
    const product: product = {
      name: req.body.name,
      price: req.body.price,
      type: req.body.type
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json({ error: `Could not create product: ${err}` });
  }
};

// update method updates product information
const update = async (req: Request, res: Response) => {
  const product: product = {
    name: req.body.name,
    price: req.body.price,
    type: req.body.type,
    id: req.body.id
  };

  try {
    const editedProduct = await store.update(product);
    res.json(editedProduct);
  } catch (err) {
    res.status(400);
    res.json({ error: `Could not update product: ${err}` });
  }
};

// destroy method deletes product by id
const destroy = async (req: Request, res: Response) => {
  try {
    const deletedUser = await store.delete(parseInt(req.params.id));
    res.json(deletedUser);
  } catch (err) {
    res.status(500);
    res.json({ error: `Could not delete product: ${err}` });
  }
};

export default productRoutes;

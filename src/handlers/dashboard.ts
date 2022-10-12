import express, { Request, Response } from 'express';
import { OrderedProduct, dashboard } from '../services/dashboard';
import { verifyAuthToken } from '../middlewares/verifyToken';

//Dashboard Routes
export const dashRoutes = (app: express.Application) => {
  app.get('/orders/:id/products', verifyAuthToken, showProducts);
  app.post('/orders/:id/products', verifyAuthToken, productsOrdered);
};

//dashboard model class
const store = new dashboard();

// productsOrdered method adds an product to an existing order in the products_order table
const productsOrdered = async (req: Request, res: Response) => {
  try {
    const product: OrderedProduct = {
      order_id: parseInt(req.params.id),
      product_id: req.body.product_id,
      quantity: req.body.quantity
    };
    const newProduct = await store.addProduct(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json({ error: `Cannot add product: ${err}` });
  }
};
// showproducts method gets the order_products table for the products added to a certain order id
const showProducts = async (req: Request, res: Response) => {
  try {
    const order = await store.showProducts(parseInt(req.params.id));
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json({ error: `Cannot get product: ${err}` });
  }
};

export default dashRoutes;

import express, { Request, Response, NextFunction, Application } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import userRoutes from './handlers/user';
import orderRoutes from './handlers/order';
import productRoutes from './handlers/product';
import dashRoutes from './handlers/dashboard';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Application = express();
// HTTP request logger middleware
app.use(morgan('short'));

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  try {
    res.send('This is the INDEX route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

userRoutes(app);
orderRoutes(app);
productRoutes(app);
dashRoutes(app);

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at Port:${PORT}`);
});

export default app;

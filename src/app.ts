import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { CarRoutes } from './app/modules/car/car.route';
import { orderRouter } from './app/modules/order/order.route';
import { UserRoutes } from './app/modules/user/user.route';
import notFound from './app/middlewares/notFound';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// Car route
app.use('/api/cars', CarRoutes);
app.use('/api/users', UserRoutes);

// Order route
app.use('/api/orders', orderRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the ecommerce api service.');
});

//Not Found
app.use(notFound);

export default app;

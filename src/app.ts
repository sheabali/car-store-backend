import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import router from './routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
const app: Application = express();

// parsers
app.use(express.json());
// app.use(cors());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

// Car route
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the ecommerce api service.');
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;

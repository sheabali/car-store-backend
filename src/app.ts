import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import notFound from './app/middlewares/notFound';

import router from './routes';
const app: Application = express();

// parsers
app.use(express.json());
// app.use(cors());
app.use(cors({ origin: ['http://localhost:5173'] }));

// Car route
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the ecommerce api service.');
});

//Not Found
app.use(notFound);

export default app;

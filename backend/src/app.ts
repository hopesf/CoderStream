import express, { Application } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import router from './routes';

const app: Application = express();

app.disable('x-powered-by');
app.use(express.urlencoded());
app.use(compression());
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(router);

export default app;

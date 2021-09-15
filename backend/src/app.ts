import express from 'express';
import routes from './routes/routes';
import "dotenv/config";

const app = express();

app.use(routes);

export default app;
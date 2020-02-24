import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import asyncHandler from 'express-async-handler';

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use('/', (req, res) => {
  return res.send('Hello World');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.debug(`Server started at http://localhost:${PORT}`);
});

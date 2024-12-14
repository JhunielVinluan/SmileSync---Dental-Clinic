import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import route from './route';
dotenv.config();

const PORT = process.env.PORT ?? 3000;
const DB_URL = process.env.MONGODB_URL ?? '';

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

app.use('/', route());

const envEnvironment = process.env.ENVIRONMENT;
if (envEnvironment == 'DEV') {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
}

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err: unknown) => {
    console.log(err);
  });

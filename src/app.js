import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import {router} from './routes/router';

export const app = express();


app.use(cookieParser(),express.urlencoded({ extended: true }));
app.use('/', router);


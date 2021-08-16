import express, { Express, NextFunction, Request, Response, } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import router from './routes';
import connect from './config/db.config';

// Setup environment setup , helps to read .env
dotenv.config();

const port = process.env.PORT || 3000;
const app: Express = express(); // Initialize the app

// setup additional header security
app.use(helmet());

// enable all cors
app.use(cors());

// Set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup route
app.use('/', router);

// Set env port for running app
app.set('port', port);

// start server
app.listen(app.get('port'), () => {
    console.log(`Server started ${port}`);
});

// connect to db 
connect();
export default app;


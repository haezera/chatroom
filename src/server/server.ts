import express, { json, Request, Response } from 'express';
import { setupSQL } from '../utils/setup';
import { userCreate } from '../utils/auth/userCreate';
import mysql from 'mysql2';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from 'middleware-http-errors';
/// GET CONFIGURATION CONSTANTS
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.APP_PORT;
const HOST = process.env.APP_HOST;
const SQL_USER = process.env.SQL_USER;
const SQL_PASSWORD = process.env.SQL_PASSWORD;

// MYSQL SETUP

const connection = mysql.createConnection({
  host: 'localhost',
  user: SQL_USER,
  password: SQL_PASSWORD
});

setupSQL(connection);

/// ALL LIBRARY CONSTANTS

const app = express();
app.use(json());
app.use(cors());
app.use(morgan('dev'));

/// BASIC FILE SERVING

app.get('/', (req: Request, res: Response) => {
  // jeff: this double .. thing seems kinda sketchy
  res.sendFile(path.resolve(__dirname, '../../public/index.html'), {
    headers: {
      'Content-Type': 'text/html',
    },
  });
});

app.get('/index.js', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../../public/index.js'), {
    headers: {
      'Content-Type': 'text/javascript',
    },
  });
});

/// API ENDPOINTS

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'You have accessed the root!' });
});

app.post('/v1/auth/user/create', (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const response = userCreate(connection, username, email, password);
  res.json(response);
});

app.delete('/v1/auth/clear', (req: Request, res: Response) => {
  setupSQL(connection); // Just resets the database
  res.json({});
});

app.use(errorHandler());

app.listen(parseInt(PORT), HOST, () => {
  // DO NOT CHANGE THIS LINE
  console.log(`⚡️ Server started on port ${PORT} at ${HOST}`);
});

process.on('SIGINT', function () {
  console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
  // some other closing procedures go here
  process.exit(0);
});

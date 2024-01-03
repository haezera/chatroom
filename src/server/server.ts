// IMPORTS
import express, { json, Request, Response } from 'express';
import { setupSQL } from '../utils/setup';
import { userCreate } from '../utils/auth/userCreate';
import mysql from 'mysql2';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from 'middleware-http-errors';
import http from 'http';
import { v4 as uuidv4 } from 'uuid';
import { WebSocketServer } from 'ws';
import { socket } from '../utils/interfaces';
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

// SERVER AND WEB SOCKET INITIALISATION

const app = express();

const server = http.createServer(app);

const wss = new WebSocketServer({ server: server });

const connections = [];

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

// WEB SOCKETS

wss.on('connection', (ws) => {
  let conn: socket;
  conn.id = uuidv4();
  conn.websocket = ws;
  connections.push(conn);

  // Send out messages to everyone
  ws.on('message', (msg) => {
    console.log('received message:', msg.toString());
    for (const conns of connections) {
      conns.send(msg.toString());
    }
  });
});

// SERVER ACTIVATION

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

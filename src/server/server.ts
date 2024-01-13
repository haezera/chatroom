// IMPORTS
import express, { json, Request, Response } from 'express';
import { setupSQL } from '../utils/setup';
import { userCreate } from '../utils/auth/userCreate';
import { fetchSessions } from '../utils/auth/getSessions';
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

const PORT: string = process.env.APP_PORT as string;
const HOST: string = process.env.APP_HOST as string;
const SQL_USER: string = process.env.SQL_USER as string;
const SQL_PASSWORD: string = process.env.SQL_PASSWORD as string;

// MYSQL SETUP
let connection: any = null;
connection = mysql.createConnection({
  host: 'localhost',
  user: SQL_USER,
  password: SQL_PASSWORD
});

setupSQL(connection);

// SERVER AND WEB SOCKET INITIALISATION

const app = express();

const server = http.createServer(app);

const wss = new WebSocketServer({ server: server });

const connections: any = [];

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

app.get('/styles.css', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../../public/styles.css'), {
    headers: {
      'Content-Type': 'text/css',
    },
  });
});


/// placeholder

app.get('/v1/auth/session/validate', (req: Request, res: Response) => {
  res.json({valid: false});
});

/// API ENDPOINTS

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'You have accessed the root!' });
});

app.post('/v1/auth/user/create', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const response = await userCreate(connection, username, email, password);

  if ('error' in response) {
    res.status(400).json(response);
    return;
  }

  res.json(response);
});

app.get('/v1/auth/admin/sessions', async (req: Request, res: Response) => {
  const password = req.query.password as string;
  const response = await fetchSessions(connection, password);

  if ('error' in response) {
    res.status(400).json(response);
    return;
  }

  res.json(response);
});

app.delete('/v1/auth/clear', (req: Request, res: Response) => {
  setupSQL(connection); // Just resets the database
  res.json({});
});

// WEB SOCKETS
wss.on('connection', (ws) => {
  const conn: socket = { id: '', websocket: null };
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

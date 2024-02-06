// IMPORTS
import express, { json, Request, Response } from 'express';
import mysql from 'mysql2';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from 'middleware-http-errors';
import http from 'http';
import { validate as isUUID } from 'uuid';
import { WebSocketServer } from 'ws';
import { pairing, socket } from '../utils/interfaces';
import { WebSocket } from 'ws';
// FUN  CTION IMPORTS
import { setupSQL } from '../utils/setup';
import { userCreate } from '../utils/auth/userCreate';
import { fetchSessions } from '../utils/auth/getSessions';
import { logoutUser } from '../utils/auth/userLogout';
import { loginUser } from '../utils/auth/userLogin';
import { createRoom } from '../utils/rooms/roomCreate';
import { roomDelete } from '../utils/rooms/roomDelete';
import { roomLeave } from '../utils/rooms/roomLeave';

/// GET CONFIGURATION CONSTANTS
import dotenv from 'dotenv';
import { roomJoin } from '../utils/rooms/roomJoin';
import { fetchRoomSession, fetchUsernameSession, fetchUserRooms, leaveRoomSession } from '../utils/sql';
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

const wss = new WebSocketServer({ server: server, path: '/chat' });

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
  res.json({ valid: false });
});

/// API ENDPOINTS

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'You have accessed the root!' });
});

// AUTH ENDPOINTS

app.post('/v1/auth/user/create', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const response = await userCreate(connection, username, email, password);

  if ('error' in response) {
    res.status(400).json(response);
    return;
  }

  res.json(response);
});

app.delete('/v1/auth/user/logout', async (req: Request, res: Response) => {
  const session = req.headers.session as string;

  if (!isUUID(session)) {
    res.status(401).json({ error: 'Inputted session is not UUID' });
    return;
  }

  const response = await logoutUser(connection, session);
  console.log(response);
  if ('error' in response) {
    res.status(400).json(response);
    return;
  }

  res.json(response);
});

app.put('/v1/auth/user/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const response = await loginUser(connection, email, password);
  console.log(response);
  if ('error' in response) {
    res.status(400).json(response);
    return;
  }

  res.json(response);
});

app.get('/v1/auth/admin/sessions', async (req: Request, res: Response) => {
  const password = req.headers.password as string;
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

// ROOM ENDPOINTS

app.post('/v1/room/create', async (req: Request, res: Response) => {
  const session = req.headers.session as string;

  if (!isUUID(session)) {
    res.status(401).json({ error: 'Session does not conform to UUID' });
    return;
  }

  const response = await createRoom(connection, "removed", session, "removed");

  if ('error' in response) {
    res.status(400).json(response);
    return;
  }

  res.json(response);
});

app.delete('/v1/room/delete', async (req: Request, res: Response) => {
  const session = req.headers.session as string;
  console.log(session);
  if (!isUUID(session)) {
    res.status(401).json({ error: 'Session does not conform to UUID' });
    return;
  }

  const room = req.query.room as string;

  const response = await roomDelete(connection, room, session);
  console.log(response);
  if ('error' in response) {
    res.status(400).json(response);
    return;
  }

  res.json(response);
});

app.put('/v1/room/join', async (req: Request, res: Response) => {
  const session = req.headers.session as string;

  if (!isUUID(session)) {
    res.status(401).json({ error: 'Session does not conform to UUID' });
    return;
  }

  const { room } = req.body;

  const response = await roomJoin(connection, room, session);

  if ('error' in response) {
    res.status(400).json(response);
    return;
  }

  res.json(response);
});

app.delete('/v1/room/leave', async (req: Request, res: Response) => {
  const session = req.headers.session as string;

  if (!isUUID(session)) {
    res.status(401).json({ error: 'Session does not conform to UUID' });
    return;
  }

  const response = await roomLeave(connection, session);

  if ('error' in response) {
    res.status(400).json(response);
    return;
  }

  res.json(response);
});

const WebSocketUsed = new Set<WebSocket>();
const WSsession = new Map<WebSocket, string>();
const sessionWS = new Map<string, WebSocket>();

// WEB SOCKETS
wss.on('connection', (ws) => {
  // Send out messages to everyone
  // This will need serious debugging btw - Hae
  ws.on('message', async (msg) => {
    // Check whether to interpret as a pairing or a message

    if (WebSocketUsed.has(ws)) {
      // Interpret as message

      // Find the room id of the current user
      const session = WSsession.get(ws);
      // Now need to find the room of this person
      const res = await connection.promise().query(
        fetchRoomSession, [session]
      );
  
      const username = await connection.promise().query(
        fetchUsernameSession, [session]
      );
  
      const room = res[0][0].room;
      
      // Now fetch a list of the people in the same room
      const users = await connection.promise().query(
        fetchUserRooms, [room]
      )[0];
  
      const wsOfUsers: WebSocket[] = [];

      // debugging
      console.log("WHAT THE HELLLLL");
      for (const i of users) {
        console.log(i);
      }
      console.log("MEOWW");

      for (const i of users) {
        wsOfUsers.push(sessionWS.get(i.session));
      }

      console.log("nevermind");
  
      // Now emit messsages
      for (const i of wsOfUsers) {
        i.send(JSON.stringify({
          username: username,
          message: msg
        }));
      }
    } else {
      // Interpret as pairing

      console.log('received pairing data:', msg.toString());
      WSsession.set(ws, msg.toString());
      sessionWS.set(msg.toString(), ws);
      WebSocketUsed.add(ws);
      // Now the pairing exists within the database.
    }
  });

  ws.on('close', async () => {
    // Deletes the mappings.
    const session = WSsession.get(ws);
    WSsession.delete(ws);
    sessionWS.delete(session);
    WebSocketUsed.delete(ws);
    // Should also let their room id be empty.

    await connection.query(
      leaveRoomSession, [session]
    );
  });
});

// SERVER ACTIVATION

app.use(errorHandler());

server.listen(parseInt(PORT), HOST, () => {
  // DO NOT CHANGE THIS LINE
  console.log(`⚡️ Server started on port ${PORT} at ${HOST}`);
});

process.on('SIGINT', function () {
  console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
  // some other closing procedures go here
  process.exit(0);
});

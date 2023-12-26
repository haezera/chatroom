import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server, Socket as ServerSocket } from 'socket.io';
import path from "path";


/// GET CONFIGURATION CONSTANTS
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.APP_PORT;

/// ALL LIBRARY CONSTANTS

const app = express();

/// BASIC FILE SERVING

app.get("/", (req: Request, res: Response) => {
  // jeff: this double .. thing seems kinda sketchy
  res.sendFile(path.resolve(__dirname, "../../public/index.html"), {
      headers: {
          "Content-Type": "text/html",
      },
  });
});

app.get("/index.js", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../../public/index.js"), {
      headers: {
          "Content-Type": "text/javascript",
      },
  });
})

/// API ENDPOINTS

/// SOCKET STUFF

const server = createServer(app);
// Initialising the server socket.
const io = new Server(server);

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>You have accessed the root!</h1>');
});

io.on('connection', (socket: ServerSocket) => {
  console.log('User has been connected.');
  socket.on('disconnect', () => {
    console.log('User has disconnected.');
  });

  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
  });
});

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server, Socket as ServerSocket } from 'socket.io';

const app = express();
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
});

server.listen(3001, () => {
  console.log('server running at http://localhost:3001');
});

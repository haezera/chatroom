import express, { Request, Response } from 'express';
import { createServer } from 'http';

const app = express();
const server = createServer(app);

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>You have accessed the root!</h1>');
});

server.listen(3001, () => {
  console.log('server running at http://localhost:3001');
});

import { Socket as ClientSocket } from 'socket.io-client';

export class User {
  userName: string;
  socket: ClientSocket;

  constructor(socket: ClientSocket, userName: string) {
    this.userName = userName;
    this.socket = socket;
  }

}

import { Socket as ServerSocket } from 'socket.io';
import { Socket as ClientSocket } from 'socket.io-client';

// Allows for testing of asychronous events - such that the socket event
// goes into the 'socket' argument, and the event, goes into the 'event' argument.
// This could be a return of a message from the socket, etc.
export function waitFor(socket: ServerSocket | ClientSocket, event: any) {
  return new Promise((resolve) => {
    socket.once(event, resolve);
  });
}

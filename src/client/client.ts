import io from 'socket.io-client';

// Connect client to server.
const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log(`You (${socket.id}) has connected.`);
});


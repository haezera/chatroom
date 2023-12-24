import io from 'socket.io-client';
import prompt from 'prompt-sync';

// Consistently reads in command line commands/messages
import repl from 'repl';
// Changes command colors.

// import { User } from '../classes/User.ts';

const promptSync = prompt();

// Connect client to server.
const socket = io('http://localhost:3001');

// Initialise user
const username = promptSync('Welcome to chat. What is your name?: ');

// const userClass = new User(newUsername, socket);

socket.on('connect', () => {
  console.log(`You (${socket.id}) has connected.`);
});

socket.on('message', (msg) => {
  console.log(`${username}: ` + msg);
});

repl.start({
    prompt: '',
    eval: (cmd) => {
        socket.send(cmd)
    }
})

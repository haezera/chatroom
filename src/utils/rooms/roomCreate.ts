import { Connection } from 'mysql2/typings/mysql/lib/Connection';
import { v4 as uuid } from 'uuid';
import { hashPassword } from '../password';
import {
  insertRoom,
  roomNameExists,
  ownerHasRoom,
  isSession
} from '../sql';

export const createRoom = async (
  connection: Connection,
  roomName: string,
  session: string,
  password: string
) => {
  // Check if session exists
  const sessionExists = await connection.promise().query(
    isSession, [session]
  );

  if (sessionExists[0][0].element_exists === 0) {
    return { error: 'Session does not exist' };
  }

  const duplicateOwner = await connection.promise().query(
    ownerHasRoom, [session]
  );

  if (duplicateOwner[0][0].element_exists === 1) {
    return { error: 'Owner already has a room' };
  }

  // Check if the room name already exists
  // const duplicateName = await connection.promise().query(
  //   roomNameExists, [roomName]
  // );

  // if (duplicateName[0][0].element_exists === 1) {
  //   return { error: 'Room name already exists' };
  // }

  // Good to make room now
  const roomId = uuid();
  const hashedPassword = hashPassword(password);
  await connection.promise().query(
    insertRoom, [roomId, roomName, hashedPassword, session]
  );

  return { room: roomId };
};

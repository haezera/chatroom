import { Connection } from 'mysql2/typings/mysql/lib/Connection';
import {
  isSession,
  isRoom,
  joinRoom,
  fetchUsernameSession
} from '../sql';

export const roomJoin = async(
  connection: Connection,
  room: string,
  session: string
) => {
  // Check if session exists
  const sessionExists = await connection.promise().query(
    isSession, [session]
  );

  // Session does not exist
  if (sessionExists[0][0].element_exists === 0) {
    return { error: 'Session does not exist' };
  }

  // Check if room exists
  const roomExists = await connection.promise().query(
    isRoom, [room]
  );

  // Room does not exist
  if (roomExists[0][0].element_exists === 0) {
    return { error: 'Room does not exist' };
  }

  // Fetch username
  const username = await connection.promise().query(
    fetchUsernameSession, [session]
  );

  // Join the room
  await connection.promise().query(
    joinRoom, [room, username[0][0].username]
  );

  return {};
};

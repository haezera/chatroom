import { Connection } from 'mysql2/typings/mysql/lib/Connection';
import { isSession, deleteRoom, getOwnerOfRoom, isRoom } from '../sql';

export const roomDelete = async (
  connection: Connection,
  room: string,
  session: string
) => {
  console.log(room);
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

  if (roomExists[0][0].element_exists === 0) {
    return { error: 'Room does not exist' };
  }

  // Check if requested session owns the room
  const ownerCheck = await connection.promise().query(
    getOwnerOfRoom, [room]
  );
  console.log(ownerCheck);
  // The request deleter does not own the room.
  if (ownerCheck[0][0].owner !== session) {
    return { error: 'You do not own this room!' };
  }

  // Delete the room
  await connection.promise().query(
    deleteRoom, [session]
  );

  return {};
};

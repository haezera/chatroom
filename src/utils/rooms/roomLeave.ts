import { Connection } from 'mysql2/typings/mysql/lib/Connection';
import { isSession, leaveRoom } from '../sql';

export const roomLeave = async(
  connection: Connection,
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

  // Leave the room
  await connection.promise().query(
    leaveRoom, [session]
  );

  return {};
};

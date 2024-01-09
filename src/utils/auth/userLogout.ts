import { Connection } from 'mysql2/typings/mysql/lib/Connection';
import { isSession, deleteSession } from '../sql';

export const logoutUser = async (
  connection: Connection,
  session: string
) => {
  // First check if there is a session
  const res = await connection.promise().query(
    isSession, [session]
  ) as any;

  if (res[0][0].element_exists === 0) {
    return { error: "The session doesn't exist" };
  }

  await connection.promise().query(
    deleteSession, [session]
  );

  return {};
};

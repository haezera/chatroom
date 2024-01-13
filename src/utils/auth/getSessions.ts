import { Connection } from 'mysql2';
import { getSessions } from '../sql';

export const fetchSessions = async (
  connection: Connection,
  adminPw: string
) => {
  // First we should check the password
  if (adminPw !== 'admin') {
    return { error: 'Admin password is not correct' };
  }

  const res = await connection.promise().query(getSessions);
  return res[0];
};

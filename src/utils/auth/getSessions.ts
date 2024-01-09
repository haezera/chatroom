import { Connection } from 'mysql2';
import HTTPError from 'http-errors';
import { getSessions } from '../sql';

export const fetchSessions = async (
  connection: Connection,
  adminPw: string
) => {
  // First we should check the password
  if (adminPw !== 'admin') {
    throw HTTPError(400, 'Admin password is not correct');
  }

  const res = await connection.promise().query(getSessions);
  console.log(res[0]);
  return res[0];
};

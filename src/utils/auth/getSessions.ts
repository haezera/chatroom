import { Connection } from 'mysql2';
import HTTPError from 'http-errors';
import { getSessions } from '../sql';

export const fetchSessions = (
  connection: Connection,
  adminPw: string
): string => {
  // First we should check the password
  if (adminPw !== 'admin') {
    throw HTTPError(400, 'Admin password is not correct');
  }

  const results = connection.query(getSessions);

  console.log(results[0]);

  return results[0];
};

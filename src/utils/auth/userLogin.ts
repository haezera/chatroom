import { insertSession, checkPassword, fetchUsername, isSessionUsername } from '../sql';
import { Connection } from 'mysql2/typings/mysql/lib/Connection';
import { verifyPassword } from '../password';
import { v4 as uuid } from 'uuid';

export const loginUser = async (
  connection: Connection,
  email: string,
  password: string
) => {
  // TODO: remove
  console.log('PASSWORD IS THIS!!!');
  console.log(password);
  console.log('HUHH WHAT');

  // Fetch encrypted password
  const pw = await connection.promise().query(
    checkPassword, [email]
  ) as any;

  if (pw[0].length === 0) {
    return { error: 'That email does not exist!' };
  }

  if (verifyPassword(password, pw[0][0].password) === false) {
    return { error: 'Password is incorrect' };
  }

  // Now need to fetch username to create session
  const username = await connection.promise().query(
    fetchUsername, email
  ) as any;

  // Check if the given username is already logged in
  const sessionExists = await connection.promise().query(
    isSessionUsername, [username[0][0].username]
  ) as any;

  if (sessionExists[0][0].element_exists === 1) {
    return { error: 'Session already exists' };
  }

  const newSession = uuid();

  await connection.promise().query(
    insertSession, [newSession, username[0][0].username]
  );

  return { session: newSession };
};

import { Connection } from 'mysql2';
import { hashPassword } from '../password';
import validator from 'validator';
import HTTPError from 'http-errors';
import { v4 as uuidv4 } from 'uuid';
import { insertUser, insertSession, userInRoom } from '../sql';

export const userCreate = (
  connection: Connection,
  username: string,
  email: string,
  password: string
) => {
  if (!validator.isEmail(email)) {
    throw HTTPError(400, 'Email is not a valid email.');
  } else if (password.length < 8) {
    throw HTTPError(400, 'Password is less then 8 characters.');
  }

  // Check if username is already in the database.
  try {
    connection.query(
      userInRoom,
      [username],
      (err: any, results: any) => {
        if (err) {
          console.log(err);
          throw HTTPError(400, 'There has been an SQL error.');
        } else {
          if (results[0].element_exists === 1) {
            throw new Error('Username already exists');
          }
        }
      }
    );
  } catch (err) {
    throw HTTPError(400, err);
  }

  const hashedPw = hashPassword(password);
  const session = uuidv4();

  // Insert the user into the users table
  connection.query(
    insertUser,
    [username, email, hashedPw, null],
    (err: any, results: any) => {
      if (err) {
        console.log(err);
        throw HTTPError(400, 'There has been an SQL error');
      } else {
        console.log(results);
      }
    }
  );

  // Now create a session for them (Auto login after registration)
  connection.query(
    insertSession,
    [session, username],
    (err: any, results: any) => {
      if (err) {
        throw HTTPError(400, `There has been an SQL error: ${err}`);
      } else {
        console.log(results);
      }
    }
  );

  return { sessionId: session };
};

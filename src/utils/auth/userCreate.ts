import { Connection } from 'mysql2';
import { hashPassword } from '../password';
import validator from 'validator';
import HTTPError from 'http-errors';
import { v4 as uuidv4 } from 'uuid';
import { insertUser } from '../sql';

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

  const hashedPw = hashPassword(password);
  const id = uuidv4();

  // Insert the user into the users table
  connection.query(
    insertUser,
    [username, email, hashedPw, null],
    (err: any, results: any) => {
      if (err) {
        throw HTTPError(400, 'There has been an SQL error');
      } else {
        console.log(results);
      }
    }
  );

  // Now create a session for them (Auto login after registration)
  
};

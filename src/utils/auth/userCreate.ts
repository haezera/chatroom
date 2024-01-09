import { Connection } from 'mysql2';
import { hashPassword } from '../password';
import validator from 'validator';
import { v4 as uuidv4 } from 'uuid';
import { insertUser, insertSession, userInRoom } from '../sql';
import { userDbResult } from '../interfaces';

export const userCreate = async (
  connection: Connection,
  username: string,
  email: string,
  password: string
) => {
  if (!validator.isEmail(email)) {
    return { error: 'Email is not valid' };
  } else if (password.length < 8) {
    return { error: 'Password is too short' };
  }

  // Check if username is already in the database.
  try {
    const res = await connection.promise().query(userInRoom, [username]) as any;
    const check: userDbResult = res[0];
    if (check.element_exists === 1) {
      throw new Error('Username already exists');
    }
  } catch (err) {
    return { error: err };
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
        return { error: err };
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
        return { error: err };
      } else {
        console.log(results);
      }
    }
  );

  return { session: session };
};

export const setupSQL = (connection: any) => {
  connection.query(
    'DROP DATABASE IF EXISTS chatroom',
    (err: any, results: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Database dropped');
      }
    }
  );

  connection.query(
    'CREATE DATABASE IF NOT EXISTS chatroom',
    (err: any, results: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Database created');
      }
    }
  );

  connection.query(
    'USE chatroom',
    (err: any, results: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Database selected');
      }
    }
  );

  connection.query(
    `CREATE TABLE IF NOT EXISTS users(
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255),
      password VARCHAR(255),
      email VARCHAR(255),
      roomId VARCHAR(255)
    )`,
    (err: any, results: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Table created');
      }
    }
  );

  connection.query(
    `CREATE TABLE IF NOT EXISTS rooms(
      roomId VARCHAR(255),
      owner VARCHAR(255)
    )`,
    (err: any, results: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Table created');
      }
    }
  );

  connection.query(
    `CREATE TABLE IF NOT EXISTS sessions(
      token VARCHAR(255),
      sessionId VARCHAR(255),
      username VARCHAR(255)
    )`,
    (err: any, results: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Table created');
      }
    }
  );
};

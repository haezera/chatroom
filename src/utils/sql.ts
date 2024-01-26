// Insert a new user into the database.
// Refer below for usage examples.
// ID compartment is automatically created and incremented.
// Password MUST BE hashed for security.
export const insertUser = `
INSERT INTO users (
    username,
    email,
    session,
    password,
    room
) VALUES (?, ?, ?, ?, ?)
`;

// Insert a new session into the database.
export const insertSession = `
INSERT into sessions(
    session,
    username
) VALUES (?, ?)
`;

// Update a session into the database;
export const updateUserSession = `
UPDATE users
SET session = ?
WHERE email = ?
`;

//  Insert a new room into the database.
export const insertRoom = `
INSERT INTO rooms(
    room,
    roomName,
    password,
    owner
) VALUES (?, ?, ?, ?)
`;

// Update user room
export const updateUserRoom = `
UPDATE users
SET room = ?
WHERE username = ?
`;

// Duplicate room name exists
export const roomNameExists = `
SELECT
    CASE
        WHEN EXISTS (
            SELECT 1
            FROM rooms
            WHERE roomName = ?
        )
        THEN 1
        ELSE 0
    END AS element_exists;
`;

// Owner already has another room
export const ownerHasRoom = `
SELECT
    CASE
        WHEN EXISTS (
            SELECT 1
            FROM rooms
            WHERE owner = ?
        )
        THEN 1
        ELSE 0
    END AS element_exists;
`;

// Returns 1 if a user is in a room, and 0 if they aren't.
export const userInRoom = `
SELECT
    CASE
        WHEN EXISTS (
            SELECT 1
            FROM users
            WHERE username = ?
        )
        THEN 1
        ELSE 0
    END AS element_exists;
`;

// Returns 1 if the user exists, and 0 if the user doesn't.
//
// Usage in ts:
// connection.query(
//    findUser,
//    ['120391'],
//    (err, results) => {
//      if (results == 1) {
//        console.log("Logged in!");
//      } else {
//        throw new Error('User could not be found!');
//      }
//    }
// )
export const findUser = `
SELECT
    CASE
        WHEN EXISTS (
            SELECT 1
            FROM users
            WHERE id = ?
        )
        THEN 1
        ELSE 0
    END AS element_exists;
`;

// Fetches the email using a users id
//
// Usage in ts:
// connection.query(
//    fetchEmail,
//    ['haeohreum09@hotmail.com'],
//    (err, results, fields) => {
//      console.log(results); [This is the actual return]
//      console.log(fields) [This is extra metadata]
//    }
// )
export const fetchEmail = `
SELECT id FROM users WHERE email=?
`;

// Fetches the room id of a username.
//
// Usage in ts:
// connection.query(
//    fetchRoomId,
//    ['haezera'],
//    (err, results) => {
//      console.log(results)
//    }
// )
export const fetchRoomId = `
SELECT room FROM users WHERE username=?
`;

// Fetches all the sessions
export const getSessions = `
SELECT * FROM sessions;
`;

// Fetches the owner of a room
export const getOwnerOfRoom = `
SELECT owner FROM rooms WHERE room = ?
`;

// Fetch same usernames
export const getRoomUsernames = `
SELECT username FROM users WHERE room = ?
`;

// Deletes a session from the sessions database (logout);
export const deleteSession = `
DELETE FROM sessions WHERE session = ?
`;

// Delete a room from the rooms database (close a room);
export const deleteRoom = `
DELETE FROM rooms WHERE owner = ?
`;

// Checks if session exists in the database
export const isSession = `
SELECT
    CASE
        WHEN EXISTS (
            SELECT 1
            FROM sessions
            WHERE session = ?
        )
        THEN 1
        ELSE 0
    END AS element_exists;
`;

// Checks if room exists in the database
export const isRoom = `
SELECT
  CASE
    WHEN EXISTS (
        SELECT 1 
        FROM rooms
        WHERE room = ?
    )
    THEN 1
    ELSE 0
  END AS element_exists;
`;

export const isSessionUsername = `
SELECT
    CASE
        WHEN EXISTS (
            SELECT 1
            FROM sessions
            WHERE username = ?
        )
        THEN 1
        ELSE 0
    END AS element_exists;
`;
// Checks if a given password is correct within the database.
export const checkPassword = `
SELECT password FROM users WHERE email=?
`;

// Fetch rooms
export const fetchUserRooms = `
SELECT session FROM users WHERE room = ?
`;

// Fetch room from session
export const fetchRoomSession = `
SELECT room FROM users WHERE session = ?
`;

// Fetches a username given an email
export const fetchUsername = `
SELECT username FROM users WHERE email = ?
`;

// Fetches a username given a session
export const fetchUsernameSession = `
SELECT username FROM sessions WHERE session = ?
`;

// Pass in an id and a new password for the user.
//
// connection.query(
//    updatePassword,
//    ['Password123', '12321321'],
//    (err, results) => {
//      if (results != 1) {
//        throw new Error('An error occured.');
//      }
//    }
// )
export const updatePassword = `
UPDATE users
SET password=?
WHERE id=?
`;

// Update a user into a new room
export const joinRoom = `
UPDATE users
SET room = ?
WHERE username = ?
`;

// Update a user to leave a room
export const leaveRoom = `
UPDATE users
SET room = EMPTY
WHERE session = ?
`;

// Update a user to leave a room with sessionId
export const leaveRoomSession = `
UPDATE users
SET room = EMPTY
WHERE session = ?
`;

// Pass in an id and a new email for the user.
//
// connection.query(
//    updateEmail,
//    ['haeohreum04@gmail.com', '12312213'],
//    (err, results) => {
//      if (results != 1) {
//        throw new Error('An error occured.');
//      }
//    }
// )
export const updateEmail = `
UPDATE users
SET email=?
WHERE id=?
`;

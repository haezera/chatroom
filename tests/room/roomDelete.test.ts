import {
  requestRoomDelete,
  requestRoomCreate,
  requestUserCreate,
  requestClear
} from '../utils/requestHelper';

describe('Room delete tests', () => {
  let roomId: any;
  let user: any;

  beforeEach(() => {
    requestClear();
    user = requestUserCreate('haezera', 'hae@hotmail.com', 'Password123');
    roomId = requestRoomCreate(user.session, 'Password123', 'Room');
  });

  test('Success', () => {
    expect(requestRoomDelete(user.session, roomId.room)).toStrictEqual({});
  });

  test('Session does not exist in database', () => {
    expect(requestRoomDelete(
      '3d6116e8-4cd6-4755-b00e-c2aa41aab985',
      roomId.room
    )).toStrictEqual(400);
  });

  test('Session does not own room', () => {
    const userTwo = requestUserCreate('hae', 'hae@gmail.com', 'Password1234');
    expect(requestRoomDelete(
      userTwo.session,
      roomId.room
    )).toStrictEqual(400);
  });

  test('Room does not exist in database', () => {
    expect(requestRoomDelete(
      user.session,
      '3d6116e8-4cd6-4755-b00e-c2aa41aab985'
    )).toStrictEqual(400);
  });

  test('Session does not conform to UUID standards', () => {
    expect(requestRoomDelete(
      '1234',
      roomId.room
    )).toStrictEqual(401);
  });
});

import {
  requestUserCreate,
  requestRoomCreate,
  requestRoomJoin
} from '../utils/requestHelper';

describe('Room join tests', () => {
  let roomId: any;
  let user: any;

  beforeEach(() => {
    user = requestUserCreate('haezera', 'hae@gmail.com', 'Password123');
    roomId = requestRoomCreate(user.session, 'Password123', 'Room');
  });

  test('Success', () => {
    expect(requestRoomJoin(user.session, roomId.room)).toBe({});
  });

  test('Session does not exist in database', () => {
    expect(requestRoomJoin(
      '3d6116e8-4cd6-4755-b00e-c2aa41aab985',
      roomId.room
    )).toStrictEqual(400);
  });

  test('Room does not exist in database', () => {
    expect(requestRoomJoin(
      user.session,
      '3d6116e8-4cd6-4755-b00e-c2aa41aab985'
    )).toStrictEqual(400);
  });

  test('Session does not conform to UUID standards', () => {
    expect(requestRoomJoin(
      '1234',
      roomId.room
    )).toStrictEqual(401);
  });
});

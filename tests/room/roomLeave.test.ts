import {
  requestUserCreate,
  requestRoomCreate,
  requestRoomJoin,
  requestRoomLeave
} from '../utils/requestHelper';

describe('Room leave tests', () => {
  let roomId: any;
  let user: any;

  beforeEach(() => {
    user = requestUserCreate('haezera', 'hae@gmail.com', 'Password123');
    roomId = requestRoomCreate(user.session, 'Password123', 'Room');
    requestRoomJoin(user.session, roomId.room);
  });

  test('Success', () => {
    expect(requestRoomLeave(user.session, roomId.room)).toBe({});
  });

  test('Session does not exist in database', () => {
    expect(requestRoomLeave(
      '3d6116e8-4cd6-4755-b00e-c2aa41aab985',
      roomId.room
    )).toStrictEqual(400);
  });

  test('Room does not exist in database', () => {
    expect(requestRoomLeave(
      user.session,
      '3d6116e8-4cd6-4755-b00e-c2aa41aab985'
    )).toStrictEqual(400);
  });

  test('Session does not conform to UUID standards', () => {
    expect(requestRoomLeave(
      '1234',
      roomId.room
    )).toStrictEqual(401);
  });
});

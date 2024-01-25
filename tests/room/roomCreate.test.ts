import {
  requestRoomCreate,
  requestUserCreate,
  requestClear
} from '../utils/requestHelper';

describe('Room create tests', () => {
  let userSession: any;

  beforeEach(() => {
    requestClear();
    userSession = requestUserCreate('haezera', 'haeohreum09@hotmail.com', 'Password123');
  });

  test('Success', () => {
    expect(
      requestRoomCreate(userSession.session, 'Password123', 'The Awesome Room')
    ).toStrictEqual({ room: expect.any(String) });
  });

  test('Duplicate room names', () => {
    const userSessionTwo = requestUserCreate('hae', 'hae@gmail.com', 'Password123');
    requestRoomCreate(userSession.session, 'Password123', 'Among Us');
    expect(
      requestRoomCreate(userSessionTwo.session, 'Password123', 'Among Us')
    ).toStrictEqual(400);
  });

  test('Already owns (is in) a room', () => {
    requestRoomCreate(userSession.session, 'Password123', 'Among Us');
    expect(
      requestRoomCreate(userSession.session, 'Password123', 'Awesome')
    ).toStrictEqual(400);
  });

  test('The token does not exist in the database', () => {
    expect(
      requestRoomCreate(
        '3d6116e8-4cd6-4755-b00e-c2aa41aab985',
        'Password123',
        'Among Us'
      )
    ).toStrictEqual(400);
  });

  test('The token does not conform to UUID standards', () => {
    expect(
      requestRoomCreate(
        '1234',
        'Password123',
        'Among Us'
      )
    ).toStrictEqual(401);
  });
});

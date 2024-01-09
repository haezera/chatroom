import { requestUserCreate, requestUserLogin, requestUserLogout } from '../utils/requestHelper';
import { requestClear } from '../utils/requestHelper';

describe('User login tests', () => {
  let res: any;
  beforeEach(() => {
    requestClear();
    res = requestUserCreate('haezera', 'hae@hotmail.com', 'Password123');
  });

  test('Success', () => {
    requestUserLogout(res.sessionId);
    expect(requestUserLogin(
      'hae@hotmail.com',
      'Password123')
    ).toStrictEqual(
      { sessionId: expect.any(String) }
    );
  });

  test('Invalid email', () => {
    expect(requestUserLogin('hae', 'Password123')).toStrictEqual(400);
  });

  test('Password is incorrect', () => {
    requestUserLogout(res.sessionId);
    expect(requestUserLogin('hae@hotmail.com', 'Password12')).toStrictEqual(400);
  });

  test('User already logged in', () => {
    expect(requestUserLogin('hae@hotmail.com', 'Password123')).toStrictEqual(400);
  });

  test('Email doesnt exist', () => {
    expect(requestUserLogin('haeohreum@hotmail.com', 'Password123')).toStrictEqual(400);
  });
});

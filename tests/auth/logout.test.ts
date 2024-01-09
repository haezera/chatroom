import { requestUserCreate, requestUserLogout } from '../utils/requestHelper';
import { requestClear } from '../utils/requestHelper';

describe('User logout tests', () => {
  beforeEach(() => {
    requestClear();
  });

  test('Success', () => {
    const res = requestUserCreate('haezera', 'haeohreum09@hotmail.com', 'Password123');
    expect(requestUserLogout(res.session)).toStrictEqual({});
  });

  test('No such session id in database', () => {
    expect(requestUserLogout('f2da16a1-dbf7-4ff4-b6c1-ee85d56bb842')).toStrictEqual(400);
  });

  test('Token is not valid', () => {
    expect(requestUserLogout('1234')).toStrictEqual(400);
  });
});

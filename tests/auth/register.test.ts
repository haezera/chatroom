import { requestUserCreate } from '../utils/requestHelper';
import { requestClear } from '../utils/requestHelper';
describe('User creation tests', () => {
  beforeEach(() => {
    requestClear();
  });

  test('Success', () => {
    expect(requestUserCreate(
      'haezera',
      'haeohreum09@hotmail.com',
      'Password123'
    )).toStrictEqual({ sessionId: expect.any(String) });
  });

  test('Email is not a valid email', () => {
    expect(requestUserCreate(
      'haezera',
      'this is not an email',
      'Password123'
    )).toStrictEqual(400);
  });

  test('Password is too short', () => {
    expect(requestUserCreate(
      'haezera',
      'haeohreum09@hotmail.com',
      '1234'
    )).toStrictEqual(400);
  });

  test.skip('Username is in use already', () => {
    requestUserCreate(
      'haezera',
      'haeohreum09@hotmail.com',
      'Password123'
    );

    expect(requestUserCreate(
      'haezera',
      'haeohreum04@gmail.com',
      'Password123'
    )).toStrictEqual(400);
  });
});

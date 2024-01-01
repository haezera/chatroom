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
    )).toStrictEqual(200);
  });

  test('Email is not a valid email', () => {
    expect(requestUserCreate(
      'haezera',
      'this is not an email',
      'Password123'
    )).toStrictEqual(200);
  });
});

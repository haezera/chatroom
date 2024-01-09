import { requestGetSessions } from '../utils/requestHelper';
import { requestUserCreate } from '../utils/requestHelper';
import { requestClear } from '../utils/requestHelper';

describe('Get sessions test', () => {
  beforeEach(() => {
    requestClear();
  });

  test('Success', () => {
    requestUserCreate('haezera', 'haeohreum09@hotmail.com', 'Password123');
    const res: any = requestGetSessions('admin');
    expect(res.length).toBe(1);
  });

  test('Admin password is not correct', () => {
    expect(requestGetSessions('notadmin')).toStrictEqual(400);
  });
});

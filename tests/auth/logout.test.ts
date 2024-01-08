import { requestUserLogout } from "../utils/requestHelper";
import { requestUserLogin } from "../utils/requestHelper";
import { requestClear } from "../utils/requestHelper";

describe('User logout tests', () => {
  beforeEach(() => {
    requestClear();
  });

  test('Success', () => {

  });

  test('No such session id in database', () => {

  });

  test('Token is not valid', () => {

  });
});

/**
 * List of users for tests
 */
import {User} from '../../../model/user';

export class UserFixture {
  static user01 = User.fromJson({
    'id': 1,
    'name': 'login',
    'email': 'mail',
    'password': 'password'
  }, User);

  static user02 = User.fromJson({
    'id': 2,
    'name': 'login2',
    'email': 'mail2',
    'password': 'password2'
  }, User);
}

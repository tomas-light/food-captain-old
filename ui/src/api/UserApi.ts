import { ApiBase } from '@api/base';
import { User } from '@models';

export class UserApi extends ApiBase {
  static getAllAsync() {
    return this.get<User[]>('/user');
  }
}

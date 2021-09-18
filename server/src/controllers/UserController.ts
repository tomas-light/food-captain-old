/*******************************************************************************
 * Copyright (c) 2021 EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 ******************************************************************************/
import { Logger } from '@utils/loggers';
import { metadata } from '@utils/metadata';
import { UserService } from '../services';
import { User } from '../services/models';
import { ControllerBase } from './base';

@metadata
class UserController extends ControllerBase {
  static area = '/api/user';
  static get = {
    '': nameof<UserController>(o => o.getUsersAsync),
  };
  static post = {
    '': nameof<UserController>(o => o.addUserAsync),
  };
  static put = {
    ':userId': nameof<UserController>(o => o.updateUserAsync),
  };
  static delete = {
    ':userId': nameof<UserController>(o => o.deleteUserAsync),
  };

  constructor(
    private readonly userService: UserService,
    logger: Logger,
    request,
    response
  ) {
    super(logger, request, response);
  }

  async getUsersAsync() {
    const result = await this.userService.getAllAsync();
    return this.ok(result);
  }

  async addUserAsync(user: User) {
    const result = await this.userService.addAsync(user);
    return this.ok(result);
  }

  async updateUserAsync(userId: number, user: User) {
    const result = await this.userService.updateAsync(user);
    return this.ok(result);
  }

  async deleteUserAsync(userId: number) {
    const user = await this.userService.getUserByIdAsync(userId);
    if (!user) {
      return this.notFound('user not found');
    }

    const result = await this.userService.deleteAsync(user);
    if (result) {
      return this.noContent();
    }
    return this.badRequest('Deletion is failed');
  }
}

export default UserController;

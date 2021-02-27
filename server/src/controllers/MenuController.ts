/*******************************************************************************
 * Copyright (c) 2021 EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 ******************************************************************************/
import { MenuService } from '../services';
import { Menu } from '../services/models';
import { ControllerBase } from './base';

class MenuController extends ControllerBase {
  static __constructorParams: InstanceType<any>[] = [MenuService]
    .concat(ControllerBase.__constructorParams);

  static area = '/api/menu';
  static get = {
    '': nameof<MenuController>(o => o.getMenusAsync),
  };
  static post = {
    '': nameof<MenuController>(o => o.addMenuAsync),
  };
  static put = {
    ':menuId': nameof<MenuController>(o => o.updateMenuAsync),
  };
  static delete = {
    ':menuId': nameof<MenuController>(o => o.deleteMenuAsync),
  };

  constructor(
    private readonly menuService: MenuService,
    logger,
    request,
    response
  ) {
    super(logger, request, response);
  }

  async getMenusAsync() {
    const result = await this.menuService.getAllAsync();
    return this.ok(result);
  }

  async addMenuAsync(menu: Menu) {
    const result = await this.menuService.addAsync(menu);
    return this.ok(result);
  }

  async updateMenuAsync(menuId: number, menu: Menu) {
    const result = await this.menuService.updateAsync(menu);
    return this.ok(result);
  }

  async deleteMenuAsync(menuId: number) {
    const menu = await this.menuService.getMenuByIdAsync(menuId);
    if (!menu) {
      return this.notFound('menu not found');
    }

    const result = await this.menuService.deleteAsync(menu);
    if (result) {
      return this.noContent();
    }
    return this.badRequest('Deletion is failed');
  }
}

export default MenuController;

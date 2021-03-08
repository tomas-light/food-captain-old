/*******************************************************************************
 * Copyright (c) 2021 EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 ******************************************************************************/
import { Mapper } from '@tomas_light/mapper-js';
import { MenuService } from '../services';
import { Menu } from '../services/models';
import { ControllerBase } from './base';
import { MenuDto } from './dto';

class MenuController extends ControllerBase {
  static __constructorParams: InstanceType<any>[] = [MenuService]
    .concat(ControllerBase.__constructorParams);

  static area = '/api/menu';
  static get = {
    '': nameof<MenuController>(o => o.getMenusAsync),
    ':menuId': nameof<MenuController>(o => o.getMenuByIdAsync),
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

  async getMenuByIdAsync(menuId: string) {
    const result = await this.menuService.getMenuByIdAsync(parseInt(menuId, 10));
    return this.ok(result);
  }

  async addMenuAsync(dto: MenuDto) {
    const menu = Mapper.map<Menu>(
      nameof<MenuDto>(),
      nameof<Menu>(),
      dto
    );
    const result = await this.menuService.addAsync(menu);
    return this.ok(result);
  }

  async updateMenuAsync(menuId: string, dto: MenuDto) {
    const menu = Mapper.map<Menu>(
      nameof<MenuDto>(),
      nameof<Menu>(),
      dto
    );
    const result = await this.menuService.updateAsync(menu);
    return this.ok(result);
  }

  async deleteMenuAsync(menuId: string) {
    const menu = await this.menuService.getMenuByIdAsync(parseInt(menuId, 10));
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

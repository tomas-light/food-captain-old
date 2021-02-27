/*******************************************************************************
 * Copyright (c) 2021 EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 ******************************************************************************/
import { DishService } from '../services';
import { Dish } from '../services/models';
import { ControllerBase } from './base';

class DishController extends ControllerBase {
  static __constructorParams: InstanceType<any>[] = [DishService]
    .concat(ControllerBase.__constructorParams);

  static area = '/api/dish';
  static get = {
    '': nameof<DishController>(o => o.getDishesAsync),
  };
  static post = {
    '': nameof<DishController>(o => o.addDishAsync),
  };
  static put = {
    ':dishId': nameof<DishController>(o => o.updateDishAsync),
  };
  static delete = {
    ':dishId': nameof<DishController>(o => o.deleteDishAsync),
  };

  constructor(
    private readonly dishService: DishService,
    logger,
    request,
    response
  ) {
    super(logger, request, response);
  }

  async getDishesAsync() {
    const result = await this.dishService.getAllAsync();
    return this.ok(result);
  }

  async addDishAsync(dish: Dish) {
    const result = await this.dishService.addAsync(dish);
    return this.ok(result);
  }

  async updateDishAsync(dishId: number, dish: Dish) {
    const result = await this.dishService.updateAsync(dish);
    return this.ok(result);
  }

  async deleteDishAsync(dishId: number) {
    const dish = await this.dishService.getDishByIdAsync(dishId);
    if (!dish) {
      return this.notFound('dish not found');
    }

    const result = await this.dishService.deleteAsync(dish);
    if (result) {
      return this.noContent();
    }
    return this.badRequest('Deletion is failed');
  }
}

export default DishController;

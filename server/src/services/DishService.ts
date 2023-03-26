import { metadata } from '@utils/metadata';
import { MakeOptional } from '@utils/types';
import { Database } from '../database';
import { ImageService } from './ImageService';
import { Dish } from './models';

@metadata
export class DishService {
  constructor(
    private readonly db: Database,
    private readonly imageService: ImageService,
  ) {
  }

  getAllAsync(): Promise<Dish[]> {
    return this.db.dish.allAsync();
  }

  getDishByIdAsync(dishId: number): Promise<Dish | null | undefined> {
    return this.db.dish.byIdAsync(dishId);
  }

  async addAsync(dish: MakeOptional<Dish, 'id'>): Promise<Dish> {
    if (dish.image) {
      dish.image = await this.imageService.addAsync(dish.image);
    }

// @ts-ignore
    dish.id = await this.db.dish.insertAsync({
      name: dish.name,
      description: dish.description,
      image_id: dish.image?.id
    });

    return dish as Dish;
  }

  async updateAsync(dish: MakeOptional<Dish, 'name'>): Promise<Dish | null | undefined> {
// @ts-ignore
    const dishEntity = await this.db.dish.updateAsync(dish);
    if (!dishEntity) {
      return undefined;
    }

    if (dish.image) {
      const imageWasDeleted = await this.imageService.deleteAsync(dish.image);
      if (imageWasDeleted) {
        dish.image = await this.imageService.addAsync(dish.image);
      }
    }

    return {
      id: dishEntity.id,
      name: dishEntity.name,
      description: dishEntity.description,
      image: dish.image,
    };
  }

  async deleteAsync(dish: Dish): Promise<boolean> {
    if (dish.image) {
      const imageWasDeleted = await this.imageService.deleteAsync(dish.image);

      if (!imageWasDeleted) {
        return false;
      }
    }

    return await this.db.dish.deleteAsync(dish.id);
  }
}

import { MakeOptional } from '@utils/types';
import { Database } from '../database';
import { Image } from './models';

export class ImageService {
  static __constructorParams: InstanceType<any>[] = [Database];

  constructor(private readonly db: Database) {
  }

  getAllAsync(): Promise<Image[]> {
    return this.db.image.allAsync();
  }

  getImageByIdAsync(imageId: number): Promise<Image | null | undefined> {
    return this.db.image.byIdAsync(imageId);
  }

  async addAsync(image: MakeOptional<Image, 'id'>): Promise<Image> {
// @ts-ignore
    image.id = await this.db.image.insertAsync({
      content: image.content,
    });

    return image as Image;
  }

  async updateAsync(image: Image): Promise<Image | null | undefined> {
// @ts-ignore
    return await this.db.image.updateAsync(image);
  }

  async deleteAsync(image: Image): Promise<boolean> {
    return await this.db.image.deleteAsync(image.id);
  }
}

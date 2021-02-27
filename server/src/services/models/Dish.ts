import { Image } from './Image';

export interface Dish {
  id: number;
  name: string;
  description?: string;
  image?: Image;
}

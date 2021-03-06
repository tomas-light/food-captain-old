import { Dish } from './Dish';
import { User } from './User';

export interface Menu {
  id: number;
  name?: string;
  createDate: Date;
  lastUpdate: Date;
  author?: User;
  dishes?: Dish[];
}

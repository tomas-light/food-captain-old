import { Menu } from './Menu';
import { User } from './User';

interface MenuInSchedule extends Menu {
  data: Date;
}

export interface Schedule {
  id: number;
  author?: User;
  name?: string;
  menus?: MenuInSchedule[];
}

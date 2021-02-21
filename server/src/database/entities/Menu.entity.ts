import { Entity } from './Entity';

export interface MenuEntity extends Entity {
  id: number;
  create_date: Date;
  last_update: Date;
  author_id?: number;
}

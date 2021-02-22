import { Entity } from './Entity';

export interface MenuEntity extends Entity {
  id: number;
  name?: string;
  create_date: Date;
  last_update: Date;
  author_id?: number;
}

import { Entity } from './Entity';

export interface UserRole extends Entity {
  user_id: number;
  role_id: number;
}

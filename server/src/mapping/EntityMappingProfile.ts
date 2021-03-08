import { MapFunction, MappingProfile, MappingProfileBase } from '@tomas_light/mapper-js';
import { MenuAttributes, MenuEntity } from '../database/entities/Menu.entity';
import { Menu } from '../services/models';

export class EntityMappingProfile extends MappingProfileBase implements MappingProfile {
  get = (): MapFunction[] => ([
    new MapFunction(
      nameof<Menu>(),
      nameof<MenuEntity>(),
      EntityMappingProfile.mapMenuToMenuEntity
    ),
    new MapFunction(
      nameof<MenuEntity>(),
      nameof<Menu>(),
      EntityMappingProfile.mapMenuEntityToMenu
    ),
  ])

  private static mapMenuToMenuEntity = (menu: Menu): MenuAttributes => {
    const entity: MenuAttributes = {
      id: menu.id,
      name: menu.name,
    } as any;

    if (menu.author) {
      entity.author_id = menu.author.id;
    }

    if (menu.createDate) {
      entity.create_date = menu.createDate.toISOString();
    }

    if (menu.lastUpdate) {
      entity.last_update = menu.lastUpdate.toISOString();
    }

    return entity;
  }

  private static mapMenuEntityToMenu = (entity: MenuAttributes): Menu => ({
    id: entity.id,
    createDate: new Date(entity.create_date),
    lastUpdate: new Date(entity.last_update),
    name: entity.name,
  })
}

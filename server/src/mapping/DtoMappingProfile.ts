import { MapFunction, MappingProfile, MappingProfileBase } from '@tomas_light/mapper-js';
import { DishInMenuDto, MenuDto, UserDto } from '../controllers/dto';
import { DishInMenu, Menu, User } from '../services/models';

export class DtoMappingProfile extends MappingProfileBase implements MappingProfile {
  get = (): MapFunction[] => ([
    new MapFunction(
      nameof<UserDto>(),
      nameof<User>(),
      DtoMappingProfile.mapUserDtoToUser
    ),
    new MapFunction(
      nameof<DishInMenuDto>(),
      nameof<DishInMenu>(),
      DtoMappingProfile.mapDishInMenuDtoToDishInMenu
    ),
    new MapFunction(
      nameof<MenuDto>(),
      nameof<Menu>(),
      DtoMappingProfile.mapMenuDtoToMenu
    ),
  ])

  private static mapUserDtoToUser = (dto: UserDto): User => ({
    id: dto.id,
    name: dto.name,
    email: dto.email,
    password: dto.password,
    roleId: dto.roleId,
  })

  private static mapDishInMenuDtoToDishInMenu = (dto: DishInMenuDto): DishInMenu => ({
    id: dto.id,
    name: dto.name,
    description: dto.description,
    image: dto.image ? {
      id: null as any,
      content: dto.image,
    }: undefined,
    order: dto.order,
  })

  private static mapMenuDtoToMenu = (dto: MenuDto): Omit<Menu, 'createDate' | 'lastUpdate'> => ({
    id: dto.id,
    name: dto.name,
    author: dto.author ? DtoMappingProfile.mapUserDtoToUser(dto.author) : undefined,
    dishes: dto.dishes ? dto.dishes.map(DtoMappingProfile.mapDishInMenuDtoToDishInMenu) : [],
  })
}

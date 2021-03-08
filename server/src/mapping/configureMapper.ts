import { Mapper } from '@tomas_light/mapper-js';
import { DtoMappingProfile } from './DtoMappingProfile';
import { EntityMappingProfile } from './EntityMappingProfile';

export function configureMapper() {
  Mapper.addProfiles([
    new EntityMappingProfile(),
    new DtoMappingProfile(),
  ]);
}

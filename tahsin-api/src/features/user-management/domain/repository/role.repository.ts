import { RoleEntity } from '../entities/role.entity';
import { DataState } from 'src/core/resources/data.state';

export interface RoleRepository {
  findById(id: number, includeUsers?: boolean): Promise<DataState<RoleEntity>>;

  findByName(
    name: string,
    includeUsers?: boolean,
  ): Promise<DataState<RoleEntity>>;

  findAll(includeUsers?: boolean): Promise<DataState<RoleEntity[]>>;

  create(role: RoleEntity): Promise<DataState<RoleEntity>>;

  update(role: RoleEntity): Promise<DataState<RoleEntity>>;

  delete(id: number): Promise<DataState<null>>;
}

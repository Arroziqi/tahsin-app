import { Inject, Injectable } from '@nestjs/common';
import { RoleRepository } from '../../domain/repository/role.repository';
import { DataState } from 'src/core/resources/data.state';
import { RoleEntity } from '../../domain/entities/role.entity';
import { ROLE_REPO_TOKEN } from 'src/core/const/provider.token';

@Injectable()
export class RoleRepositoryImpl implements RoleRepository {
  constructor(
    @Inject(ROLE_REPO_TOKEN) private readonly roleRepository: RoleRepository,
  ) {}

  async findById(
    id: number,
    includeUsers?: boolean,
  ): Promise<DataState<RoleEntity>> {
    return await this.roleRepository.findById(id, includeUsers);
  }

  async findByName(
    name: string,
    includeUsers?: boolean,
  ): Promise<DataState<RoleEntity>> {
    return await this.roleRepository.findByName(name, includeUsers);
  }

  async findAll(includeUsers?: boolean): Promise<DataState<RoleEntity[]>> {
    return await this.roleRepository.findAll(includeUsers);
  }

  async create(role: RoleEntity): Promise<DataState<RoleEntity>> {
    return await this.roleRepository.create(role);
  }

  async update(role: RoleEntity): Promise<DataState<RoleEntity>> {
    return await this.roleRepository.update(role);
  }

  async delete(id: number): Promise<DataState<null>> {
    return await this.roleRepository.delete(id);
  }
}

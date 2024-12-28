import { Inject, Injectable } from '@nestjs/common';
import { ROLE_REPO_TOKEN } from 'src/core/const/provider.token';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { RoleEntity } from '../../entities/role.entity';
import { RoleRepository } from '../../repository/role.repository';

@Injectable()
export class GetAllRoleUsecase
  implements UseCase<void, DataState<RoleEntity[]>>
{
  constructor(
    @Inject(ROLE_REPO_TOKEN) private readonly roleRepository: RoleRepository,
  ) {}

  async execute(): Promise<DataState<RoleEntity[]>> {
    return await this.roleRepository.findAll(true);
  }
}

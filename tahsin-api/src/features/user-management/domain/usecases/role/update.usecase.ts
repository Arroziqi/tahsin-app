import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataFailed, DataState } from 'src/core/resources/data.state';
import { RoleEntity } from '../../entities/role.entity';
import { RoleRepository } from '../../repository/role.repository';
import { ROLE_REPO_TOKEN } from 'src/core/const/provider.token';
import { ErrorEntity } from 'src/core/domain/entities/error.entity';

@Injectable()
export class UpdateRoleUsecase
  implements UseCase<RoleEntity, DataState<RoleEntity>>
{
  constructor(
    @Inject(ROLE_REPO_TOKEN) private readonly roleRepository: RoleRepository,
  ) {}

  async execute(input: RoleEntity): Promise<DataState<RoleEntity>> {
    const existingRole = await this.roleRepository.findById(input.id, true);

    if (!existingRole.data) {
      return new DataFailed<RoleEntity>(new ErrorEntity(404, 'Role not found'));
    }

    return await this.roleRepository.update(input);
  }
}

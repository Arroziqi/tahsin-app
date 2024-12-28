import { RoleRepository } from '../../repository/role.repository';

import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';

import { DataState } from 'src/core/resources/data.state';
import { ErrorEntity } from 'src/core/domain/entities/error.entity';
import { ROLE_REPO_TOKEN } from 'src/core/const/provider.token';

@Injectable()
export class DeleteRoleUsecase implements UseCase<number, DataState<null>> {
  private readonly logger = new Logger(DeleteRoleUsecase.name);

  constructor(
    @Inject(ROLE_REPO_TOKEN) private readonly roleRepository: RoleRepository,
  ) {}

  async execute(input: number): Promise<DataState<null>> {
    this.logger.debug(`Attempting to delete role with id: ${input}`);

    const existingRole = await this.roleRepository.findById(input, true);

    if (!existingRole.data) {
      this.logger.warn(`Role with id ${input} not found`);
      throw new ErrorEntity(
        404,
        'Role not found',
        'Role with given ID does not exist',
      );
    }

    this.logger.debug(`Deleting role with id: ${input}`);
    const result = await this.roleRepository.delete(input);

    this.logger.debug(`Successfully deleted role with id: ${input}`);
    return result;
  }
}

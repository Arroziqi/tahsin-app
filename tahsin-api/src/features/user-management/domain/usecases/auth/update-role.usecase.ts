import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { UserEntity } from '../../entities/user.entity';
import { USER_REPO_TOKEN } from 'src/core/const/provider.token';
import { UserRepository } from '../../repository/user.repository';
import { DataState } from 'src/core/resources/data.state';

@Injectable()
export class UpdateUserRoleUsecase
  implements UseCase<UserEntity, DataState<UserEntity>>
{
  private readonly logger = new Logger(UpdateUserRoleUsecase.name);

  constructor(
    @Inject(USER_REPO_TOKEN) private readonly userRepository: UserRepository,
  ) {}

  async execute(input: UserEntity): Promise<DataState<UserEntity>> {
    this.logger.debug(`Checking if user exists with ID: ${input.id}`);

    const existingUser = await this.userRepository.findById(input.id);

    if (!existingUser.data) {
      this.logger.warn(`User not found`);
      throw new NotFoundException(`User not found`);
    }

    this.logger.debug(`Updating user with ID: ${input.id}`);
    return await this.userRepository.updateRole(input.id, input.role_id);
  }
}

import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { USER_REPO_TOKEN } from 'src/core/const/provider.token';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { UserRepository } from '../../repository/user.repository';

@Injectable()
export class DeleteUsecase implements UseCase<number, DataState<string>> {
  private readonly logger = new Logger(DeleteUsecase.name);

  constructor(
    @Inject(USER_REPO_TOKEN) private readonly userRepository: UserRepository,
  ) {}

  async execute(input: number): Promise<DataState<string>> {
    this.logger.debug(`Checking if user exists with ID: ${input}`);

    const existingUser = await this.userRepository.findById(input);

    if (!existingUser.data) {
      this.logger.warn(`User with ID ${input} not found`);
      throw new NotFoundException(`User with ID ${input} not found`);
    }

    this.logger.debug(`Deleting user with ID: ${input}`);
    return await this.userRepository.delete(input);
  }
}

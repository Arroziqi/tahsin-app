import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { ErrorEntity } from 'src/core/domain/entities/error.entity';
import { USER_REPO_TOKEN } from 'src/core/const/provider.token';
import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../../repository/user.repository';

@Injectable()
export class AddUsersUsecase
  implements UseCase<UserEntity[], DataState<UserEntity[]>>
{
  private readonly logger = new Logger(AddUsersUsecase.name);

  constructor(
    @Inject(USER_REPO_TOKEN) private readonly userRepository: UserRepository,
  ) {}

  async execute(inputs: UserEntity[]): Promise<DataState<UserEntity[]>> {
    const emails = inputs.map((user) => user.email);

    this.logger.debug(`Checking email existence for multiple users}`);

    const existingUsers = await this.userRepository.findByEmails(emails);
    const existingEmails = existingUsers.data?.map((user) => user.email) || [];

    if (existingEmails.length > 0) {
      this.logger.warn(
        `Signup attempt with existing emails: ${JSON.stringify(existingEmails, null, 2)}`,
      );
      throw new ErrorEntity(
        409,
        `The following emails already exist: ${existingEmails.join(', ')}`,
        'Emails already exist',
      );
    }

    const result = await this.userRepository.createMany(inputs);
    this.logger.log(`New users created successfully}`);

    return result;
  }
}

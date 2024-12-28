import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { USER_REPO_TOKEN } from 'src/core/const/provider.token';
import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../../repository/user.repository';
import { UserService } from 'src/features/user-management/domain/services/user.service';

@Injectable()
export class SignupUsecase
  implements UseCase<UserEntity, DataState<UserEntity>>
{
  private readonly logger = new Logger(SignupUsecase.name);

  constructor(
    @Inject(USER_REPO_TOKEN) private readonly userRepository: UserRepository,
    private readonly userService: UserService,
  ) {}

  async execute(input: UserEntity): Promise<DataState<UserEntity>> {
    await this.userService.checkUserWithSameUsername(input.username);
    await this.userService.checkUserWithSameEmail(input.email);

    const result = await this.userRepository.create(input);
    this.logger.log(`New user created with email: ${input.email}`);

    return result;
  }
}

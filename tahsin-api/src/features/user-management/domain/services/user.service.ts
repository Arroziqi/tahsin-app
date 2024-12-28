import { Inject, Injectable, Logger } from '@nestjs/common';
import { USER_REPO_TOKEN } from 'src/core/const/provider.token';
import { UserRepository } from 'src/features/user-management/domain/repository/user.repository';
import { ErrorEntity } from 'src/core/domain/entities/error.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @Inject(USER_REPO_TOKEN) private readonly userRepository: UserRepository,
  ) {}

  async checkUserWithSameUsername(username: string): Promise<void> {
    const userWithSameUsername = await this.userRepository.findByUsername(
      username,
      true,
    );

    this.logger.debug(
      `Checking username existence: ${username}`,
      JSON.stringify(userWithSameUsername, null, 2),
    );

    if (userWithSameUsername.data) {
      this.logger.warn(`Signup attempt with existing username: ${username}`);
      throw new ErrorEntity(
        409,
        'Username already exist, please use another username',
        'Username already exist',
      );
    }
  }

  async checkUserWithSameEmail(email: string): Promise<void> {
    const userWithSameEmail = await this.userRepository.findByEmail(
      email,
      true,
    );

    this.logger.debug(
      `Checking email existence: ${email}`,
      JSON.stringify(userWithSameEmail, null, 2),
    );

    if (userWithSameEmail.data) {
      this.logger.warn(`Signup attempt with existing email: ${email}`);
      throw new ErrorEntity(
        409,
        'Email already exist, please use another email',
        'Email already exist',
      );
    }
  }
}

import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { AddUsersSchema } from 'src/features/user-management/presentation/dto/auth/add-users.dto';
import { UserModel } from '../../data/models/user.model';
import { AuthService } from '../../services/auth.service';
import { PasswordService } from '../../services/password.service';

@Injectable()
export class AddUsersPipe implements PipeTransform {
  private readonly logger = new Logger(AddUsersPipe.name);

  constructor(
    private readonly authService: AuthService,
    private readonly passwordService: PasswordService,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting add users validation');

    const result = AddUsersSchema.safeParse(value);
    if (!result.success) {
      this.logger.error('Add users validation failed', result.error.errors);
      throw new BadRequestException(result.error.errors);
    }

    const users = result.data;

    const processedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await this.passwordService.hashedPassword(
          user.password,
        );
        this.logger.debug(`Password hashed for user: ${user.username}`);
        return new UserModel({
          username: user.username,
          email: user.email,
          password: hashedPassword,
          role_id: user.role_id,
        });
      }),
    );

    this.logger.debug('All user models created successfully');
    return processedUsers;
  }
}

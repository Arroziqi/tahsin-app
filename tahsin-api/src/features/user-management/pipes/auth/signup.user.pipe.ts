import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { SignupUserSchema } from '../../presentation/dto/auth/signup.dto';
import { UserModel } from '../../data/models/user.model';
import { AuthService } from '../../services/auth.service';
import { PasswordService } from '../../services/password.service';

@Injectable()
export class SignupUserPipe implements PipeTransform {
  private readonly logger = new Logger(SignupUserPipe.name);

  constructor(
    private readonly authService: AuthService,
    private readonly passwordService: PasswordService,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting user signup validation');

    const result = SignupUserSchema.safeParse(value);
    if (!result.success) {
      this.logger.error('Signup validation failed', result.error.errors);
      throw new BadRequestException(result.error.errors);
    }

    const { username, email, password } = result.data;
    this.logger.debug(`Processing signup for user: ${username} (${email})`);

    const hashedPassword = await this.passwordService.hashedPassword(password);
    this.logger.debug('Password hashed successfully');

    const userModel = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    this.logger.debug('User model created successfully');
    return userModel;
  }
}

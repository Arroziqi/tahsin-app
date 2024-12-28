import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { UserModel } from '../../data/models/user.model';
import { AuthService } from '../../services/auth.service';
import { UpdateRoleDtoSchema } from 'src/features/user-management/presentation/dto/auth/update-role.dto';

@Injectable()
export class UpdateUserRolePipe implements PipeTransform {
  private readonly logger = new Logger(UpdateUserRolePipe.name);

  constructor(private readonly authService: AuthService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting update user role validation');

    const result = UpdateRoleDtoSchema.safeParse(value);
    if (!result.success) {
      this.logger.error(
        'update user role validation failed',
        result.error.errors,
      );
      throw new BadRequestException(result.error.errors);
    }

    const { role_id } = result.data;
    this.logger.debug(`Processing update role user`);

    const userModel = new UserModel({
      role_id,
    });

    this.logger.debug('User model created successfully');
    return userModel;
  }
}

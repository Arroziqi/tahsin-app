import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  Logger,
} from '@nestjs/common';
import { UpdateProfileSchema } from '../../presentation/dto/profile/update.dto';
import { ProfileModel } from '../../data/models/profile.model';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UpdateProfilePipe implements PipeTransform {
  private readonly logger = new Logger(UpdateProfilePipe.name);

  transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting profile update validation');

    const result = UpdateProfileSchema.safeParse(value);
    if (!result.success) {
      this.logger.error('Profile validation failed', result.error.errors);
      throw new BadRequestException(result.error.errors);
    }

    const profileModel = plainToInstance(ProfileModel, {
      ...result.data,
      user_id: value.user_id,
    });

    this.logger.debug('Profile validation completed successfully');

    return profileModel;
  }
}

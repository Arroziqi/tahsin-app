import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { CreateProfileSchema } from '../../presentation/dto/profile/create.dto';
import { ProfileModel } from '../../data/models/profile.model';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreateProfilePipe implements PipeTransform {
  private readonly logger = new Logger(CreateProfilePipe.name);

  transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting profile creation validation');

    const result = CreateProfileSchema.safeParse(value);
    if (!result.success) {
      this.logger.error('Profile validation failed', result.error.errors);
      throw new BadRequestException(result.error.errors);
    }

    return plainToInstance(ProfileModel, {
      ...result.data,
      user_id: value.user_id,
    });
  }
}

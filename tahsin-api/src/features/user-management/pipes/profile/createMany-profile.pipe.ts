import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { ProfileModel } from '../../data/models/profile.model';
import { plainToInstance } from 'class-transformer';
import { CreateManyProfileSchema } from '../../presentation/dto/profile/createMany-profile.dto';

@Injectable()
export class CreateManyProfilePipe implements PipeTransform {
  private readonly logger = new Logger(CreateManyProfilePipe.name);

  transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting profile creation validation');

    const { admin_id, ...req } = value;

    if (typeof req !== 'object' || !Object.keys(req).length) {
      this.logger.error('Expected req to be an array of profiles');
      throw new BadRequestException(
        'Invalid input: req should be an array of profiles',
      );
    }

    const profiles = Array.isArray(req) ? req : Object.values(req);

    const results = profiles.map((item: any) => {
      return CreateManyProfileSchema.safeParse(item);
    });

    const errors = results
      .filter((result) => !result.success)
      .map((result) => result.error.errors);
    if (errors.length > 0) {
      this.logger.error('Profile validation failed', errors);
      throw new BadRequestException(errors);
    }

    return plainToInstance(ProfileModel, [
      ...results.map((result) => ({ ...result.data, admin_id })),
    ]);
  }
}

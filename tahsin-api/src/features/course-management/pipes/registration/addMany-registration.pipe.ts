import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { AddManyRegistrationSchema } from '../../presentation/dto/registration/addMany-registration.dto';

@Injectable()
export class AddManyRegistrationPipe implements PipeTransform {
  private readonly logger = new Logger(AddManyRegistrationPipe.name);

  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting request validation');

    const { admin_id, ...req } = value;

    if (typeof req !== 'object' || !Object.keys(req).length) {
      this.logger.error('Expected req to be an array of registrations');
      throw new BadRequestException(
        'Invalid input: req should be an array of registrations',
      );
    }

    const registrations = Array.isArray(req) ? req : Object.values(req);

    const results = registrations.map((item: any) => {
      return AddManyRegistrationSchema.safeParse(item);
    });

    const errors = results
      .filter((result) => !result.success)
      .map((result) => result.error.errors);
    if (errors.length > 0) {
      this.logger.error('Registration validation failed', errors);
      throw new BadRequestException(errors);
    }

    this.logger.debug('Request validation successful');
    return results.map((result) => ({ ...result.data, admin_id: admin_id }));
  }
}

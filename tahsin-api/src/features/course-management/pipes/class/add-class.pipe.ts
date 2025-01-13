import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { AddClassSchema } from '../../presentation/dto/class/add-class.dto';

@Injectable()
export class AddClassPipe implements PipeTransform {
  private readonly logger = new Logger(AddClassPipe.name);

  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting request validation');

    const result = AddClassSchema.safeParse(value);

    if (!result.success) {
      this.logger.error('Request validation failed', result.error.errors);
      throw new BadRequestException(result.error.errors);
    }

    this.logger.debug('Request validation successful');
    return result.data;
  }
}

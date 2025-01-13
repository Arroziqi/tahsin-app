import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { UpdateClassSchema } from '../../presentation/dto/class/update-class.dto';

@Injectable()
export class UpdateClassPipe implements PipeTransform {
  private readonly logger = new Logger(UpdateClassPipe.name);

  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting request validation');

    const result = UpdateClassSchema.safeParse(value);

    if (!result.success) {
      this.logger.error('Request validation failed', result.error.errors);
      throw new BadRequestException(result.error.errors);
    }

    this.logger.debug('Request validation successful');
    return result.data;
  }
}

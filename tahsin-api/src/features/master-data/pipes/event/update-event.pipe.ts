import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  Logger,
} from '@nestjs/common';
import { UpdateEventSchema } from '../../presentation/dto/event/update-event.dto';

@Injectable()
export class UpdateEventPipe implements PipeTransform {
  private readonly logger = new Logger(UpdateEventPipe.name);

  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting request validation');

    const result = UpdateEventSchema.safeParse(value);

    if (!result.success) {
      this.logger.error('Request validation failed', result.error.errors);
      throw new BadRequestException(result.error.errors);
    }

    this.logger.debug('Request validation successful');
    return result.data;
  }
}

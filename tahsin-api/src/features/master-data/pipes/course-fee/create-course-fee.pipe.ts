import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { AddCourseFeeSchema } from 'src/features/master-data/presentation/dto/course-fee/add-course-fee.dto';

@Injectable()
export class CreateCourseFeePipe implements PipeTransform {
  private readonly logger = new Logger(CreateCourseFeePipe.name);

  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting request validation');

    const result = AddCourseFeeSchema.safeParse(value);

    if (!result.success) {
      this.logger.error('Request validation failed', result.error.errors);
      throw new BadRequestException(result.error.errors);
    }

    this.logger.debug('Request validation successful');
    return result.data;
  }
}

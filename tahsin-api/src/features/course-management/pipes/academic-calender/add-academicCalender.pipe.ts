import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { AddAcademicCalenderSchema } from '../../presentation/dto/academic-calender/add-academicCalender.dto';

@Injectable()
export class AddAcademicCalenderPipe implements PipeTransform {
  private readonly logger = new Logger(AddAcademicCalenderPipe.name);

  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting request validation');

    const result = AddAcademicCalenderSchema.safeParse(value);

    if (!result.success) {
      this.logger.error('Request validation failed', result.error.errors);
      throw new BadRequestException(result.error.errors);
    }

    this.logger.debug('Request validation successful');
    return result.data;
  }
}

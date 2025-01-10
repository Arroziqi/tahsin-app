import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { UpdateAcademicCalenderSchema } from '../../presentation/dto/academic-calender/update-academicCalender.dto';

@Injectable()
export class UpdateAcademicCalenderPipe implements PipeTransform {
  private readonly logger = new Logger(UpdateAcademicCalenderPipe.name);

  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting request validation');

    const result = UpdateAcademicCalenderSchema.safeParse(value);

    if (!result.success) {
      this.logger.error('Request validation failed', result.error.errors);
      throw new BadRequestException(result.error.errors);
    }

    this.logger.debug('Request validation successful');
    return result.data;
  }
}

import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { UpdateAcademicTermSchema } from '../../presentation/dto/academic-term/update-academicTerm.dto';

@Injectable()
export class UpdateAcademicTermPipe implements PipeTransform {
  private readonly logger = new Logger(UpdateAcademicTermPipe.name);

  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting request validation');

    const result = UpdateAcademicTermSchema.safeParse(value);

    if (!result.success) {
      this.logger.error('Request validation failed', result.error.errors);
      throw new BadRequestException(result.error.errors);
    }

    this.logger.debug('Request validation successful');
    return result.data;
  }
}

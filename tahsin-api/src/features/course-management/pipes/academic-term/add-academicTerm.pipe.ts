import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { AddAcademicTermSchema } from '../../presentation/dto/academic-term/add-academicTerm.dto';

@Injectable()
export class AddAcademicTermPipe implements PipeTransform {
  private readonly logger = new Logger(AddAcademicTermPipe.name);

  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting request validation');
    const { user_id, ...data } = value;

    const result = AddAcademicTermSchema.safeParse(data);

    if (!result.success) {
      this.logger.error('Request validation failed', result.error.errors);
      throw new BadRequestException(result.error.errors);
    }

    this.logger.debug('Request validation successful');
    return { ...result.data, admin_id: user_id };
  }
}

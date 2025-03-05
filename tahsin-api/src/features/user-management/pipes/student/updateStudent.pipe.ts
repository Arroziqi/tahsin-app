import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UpdateStudentSchema } from '../../presentation/dto/student/updateStudent.dto';
import { StudentModel } from '../../data/models/student.model';

@Injectable()
export class UpdateStudentPipe implements PipeTransform {
  private readonly logger = new Logger(UpdateStudentPipe.name);

  transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting student update validation');

    const result = UpdateStudentSchema.safeParse(value);
    if (!result.success) {
      this.logger.error('Student validation failed', result.error.errors);
      throw new BadRequestException(result.error.errors);
    }

    const studentModel: StudentModel = plainToInstance(StudentModel, {
      ...result.data,
      user_id: value.user_id,
    });

    this.logger.debug('Student validation completed successfully');

    return studentModel;
  }
}

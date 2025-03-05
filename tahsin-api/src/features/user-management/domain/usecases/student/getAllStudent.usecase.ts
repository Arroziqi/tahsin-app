import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { DataState } from '../../../../../core/resources/data.state';
import { StudentEntity } from '../../entities/student.entity';
import { StudentRepository } from '../../repository/student.repository';
import { STUDENT_REPO_TOKEN } from '../../../../../core/const/provider.token';

@Injectable()
export class GetAllStudentUsecase
  implements UseCase<void, DataState<StudentEntity[]>>
{
  private readonly logger: Logger = new Logger(GetAllStudentUsecase.name);

  constructor(
    @Inject(STUDENT_REPO_TOKEN)
    private readonly studentRepository: StudentRepository,
  ) {}

  async execute(input: void): Promise<DataState<StudentEntity[]>> {
    this.logger.debug(`Getting all students`);
    const result: DataState<StudentEntity[]> =
      await this.studentRepository.findAll();

    this.logger.debug(`successfully getting all students`);
    return result;
  }
}

import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { StudentEntity } from '../../entities/student.entity';
import { DataState } from '../../../../../core/resources/data.state';
import { STUDENT_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { StudentRepository } from '../../repository/student.repository';
import { StudentService } from '../../services/student.service';
import { UserService } from '../../services/user.service';

@Injectable()
export class UpdateStudentUseCase
  implements UseCase<StudentEntity, DataState<StudentEntity>>
{
  private readonly logger = new Logger(UpdateStudentUseCase.name);

  constructor(
    @Inject(STUDENT_REPO_TOKEN)
    private readonly studentRepository: StudentRepository,
    private readonly studentService: StudentService,
    private readonly userService: UserService,
  ) {}

  async execute(input: StudentEntity): Promise<DataState<StudentEntity>> {
    await this.userService.checkExistingUserWithId(input.user_id);
    await this.studentService.checkExistingStudentById(input.id);

    this.logger.debug(`updating student with id ${input.id}`);
    const result: DataState<StudentEntity> =
      await this.studentRepository.update(input);

    this.logger.debug(`successfully updated student with id: ${input.id}`);
    return result;
  }
}

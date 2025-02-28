import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { StudentEntity } from '../../entities/student.entity';
import { DataState } from '../../../../../core/resources/data.state';
import { STUDENT_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { StudentRepository } from '../../repository/student.repository';
import { StudentService } from '../../services/student.service';
import { UserService } from '../../services/user.service';

@Injectable()
export class AddStudentUseCase
  implements UseCase<StudentEntity, DataState<StudentEntity>>
{
  private readonly logger = new Logger(AddStudentUseCase.name);

  constructor(
    @Inject(STUDENT_REPO_TOKEN)
    private readonly studentRepository: StudentRepository,
    private readonly studentService: StudentService,
    private readonly userService: UserService,
  ) {}

  async execute(input: StudentEntity): Promise<DataState<StudentEntity>> {
    await this.userService.checkExistingUserWithId(input.user_id);
    await this.studentService.checkDuplicateStudent(input.user_id);

    this.logger.debug(`creating student with id ${input.user_id}`);
    const result = await this.studentRepository.create(input);

    this.logger.debug(`successfully created student with id: ${input.id}`);
    return result;
  }
}

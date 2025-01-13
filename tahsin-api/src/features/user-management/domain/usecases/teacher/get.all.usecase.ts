import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { TEACHER_REPO_TOKEN } from 'src/core/const/provider.token';
import { TeacherRepository } from '../../repository/teacher.repository';
import { TeacherEntity } from '../../entities/teacher.entity';

@Injectable()
export class GetAllTeacherUsecase
  implements UseCase<void, DataState<TeacherEntity[]>>
{
  private readonly logger = new Logger(GetAllTeacherUsecase.name);

  constructor(
    @Inject(TEACHER_REPO_TOKEN)
    private readonly teacherRepository: TeacherRepository,
  ) {}

  async execute(): Promise<DataState<TeacherEntity[]>> {
    this.logger.debug('Getting all teachers');
    const result = await this.teacherRepository.findAll();

    this.logger.debug(
      `Successfully retrieved ${result.data?.length || 0} teachers`,
    );
    return result;
  }
}

import { Inject, Injectable, Logger } from '@nestjs/common';
import { TEACHER_REPO_TOKEN } from 'src/core/const/provider.token';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { TeacherRepository } from '../../repository/teacher.repository';
import { TeacherEntity } from '../../entities/teacher.entity';

@Injectable()
export class GetTeacherUsecase
  implements UseCase<number, DataState<TeacherEntity>>
{
  private readonly logger = new Logger(GetTeacherUsecase.name);

  constructor(
    @Inject(TEACHER_REPO_TOKEN)
    private readonly teacherRepository: TeacherRepository,
  ) {}

  async execute(input: number): Promise<DataState<TeacherEntity>> {
    this.logger.debug(`Getting teacher with id: ${input}`);
    const result = await this.teacherRepository.findByUserId(input);

    this.logger.debug(`Successfully retrieved teacher with id: ${input}`);
    return result;
  }
}

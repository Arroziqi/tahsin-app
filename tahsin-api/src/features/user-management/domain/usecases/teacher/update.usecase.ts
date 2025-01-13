import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { TEACHER_REPO_TOKEN } from 'src/core/const/provider.token';
import { TeacherRepository } from '../../repository/teacher.repository';
import { TeacherEntity } from '../../entities/teacher.entity';
import { TeacherService } from '../../services/teacher.service';

@Injectable()
export class UpdateTeacherUsecase
  implements UseCase<TeacherEntity, DataState<TeacherEntity>>
{
  private readonly logger = new Logger(UpdateTeacherUsecase.name);

  constructor(
    @Inject(TEACHER_REPO_TOKEN)
    private readonly teacherRepository: TeacherRepository,
    private readonly teacherService: TeacherService,
  ) {}

  async execute(input: TeacherEntity): Promise<DataState<TeacherEntity>> {
    await this.teacherService.checkExistingTeacherWithUserId(input.id);
    const existingTeacherId = await this.teacherService.getTeacherId(input.id);

    this.logger.debug(`Updating teacher for user id: ${input.user_id}`);
    const result = await this.teacherRepository.update({
      ...input,
      id: existingTeacherId.data.id,
    });

    this.logger.debug(
      `Successfully updated teacher for user id: ${input.user_id}`,
    );
    return result;
  }
}

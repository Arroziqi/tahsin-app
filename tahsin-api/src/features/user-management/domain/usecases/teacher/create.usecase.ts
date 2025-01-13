import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import {
  TEACHER_REPO_TOKEN,
  USER_REPO_TOKEN,
} from 'src/core/const/provider.token';
import { UserRepository } from '../../repository/user.repository';
import { TeacherEntity } from '../../entities/teacher.entity';
import { TeacherRepository } from '../../repository/teacher.repository';
import { UserService } from '../../services/user.service';
import { TeacherService } from '../../services/teacher.service';

@Injectable()
export class CreateTeacherUsecase
  implements UseCase<TeacherEntity, DataState<TeacherEntity>>
{
  private readonly logger = new Logger(CreateTeacherUsecase.name);

  constructor(
    @Inject(TEACHER_REPO_TOKEN)
    private readonly teacherRepository: TeacherRepository,
    @Inject(USER_REPO_TOKEN) private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly teacherService: TeacherService,
  ) {}

  async execute(input: TeacherEntity): Promise<DataState<TeacherEntity>> {
    await this.userService.checkExistingUserWithId(input.id);

    await this.teacherService.checkExistingTeacherWithUserId(input.id);

    this.logger.debug(`Creating teacher for user id: ${input.user_id}`);
    const result = await this.teacherRepository.create(input);

    this.logger.debug(
      `Successfully created teacher for user id: ${input.user_id}`,
    );
    return result;
  }
}

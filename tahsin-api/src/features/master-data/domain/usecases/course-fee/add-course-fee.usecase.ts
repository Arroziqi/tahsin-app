import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { COURSE_FEE_REPO_TOKEN } from 'src/core/const/provider.token';
import { CourseFeeEntity } from 'src/features/master-data/domain/entities/course-fee.entity';
import { CourseFeeRepository } from 'src/features/master-data/domain/repository/course-fee.repository';

@Injectable()
export class AddCourseFeeUsecase
  implements UseCase<CourseFeeEntity, DataState<CourseFeeEntity>>
{
  private readonly logger: Logger = new Logger(AddCourseFeeUsecase.name);

  constructor(
    @Inject(COURSE_FEE_REPO_TOKEN)
    private readonly courseFeeRepository: CourseFeeRepository,
  ) {}

  async execute(input: CourseFeeEntity): Promise<DataState<CourseFeeEntity>> {
    this.logger.debug('creating course fee');
    const result = await this.courseFeeRepository.create(input);

    this.logger.log('successfully created course fee');
    return result;
  }
}

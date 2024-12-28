import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { COURSE_FEE_REPO_TOKEN } from 'src/core/const/provider.token';
import { CourseFeeEntity } from 'src/features/master-data/domain/entities/course-fee.entity';
import { CourseFeeRepository } from 'src/features/master-data/domain/repository/course-fee.repository';

@Injectable()
export class GetAllCourseFeeUsecase
  implements UseCase<void, DataState<CourseFeeEntity[]>>
{
  private readonly logger = new Logger(GetAllCourseFeeUsecase.name);

  constructor(
    @Inject(COURSE_FEE_REPO_TOKEN)
    private readonly courseFeeRepository: CourseFeeRepository,
  ) {}

  async execute(): Promise<DataState<CourseFeeEntity[]>> {
    this.logger.debug('Getting all course fee');
    const result: DataState<CourseFeeEntity[]> =
      await this.courseFeeRepository.findAll(true);

    this.logger.debug('Successfully all course fee');
    return result;
  }
}

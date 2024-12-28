import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { COURSE_FEE_REPO_TOKEN } from 'src/core/const/provider.token';
import { CourseFeeEntity } from 'src/features/master-data/domain/entities/course-fee.entity';
import { CourseFeeRepository } from 'src/features/master-data/domain/repository/course-fee.repository';

@Injectable()
export class UpdateCourseFeeUsecase
  implements UseCase<CourseFeeEntity, DataState<CourseFeeEntity>>
{
  private readonly logger = new Logger(UpdateCourseFeeUsecase.name);

  constructor(
    @Inject(COURSE_FEE_REPO_TOKEN)
    private readonly courseFeeRepository: CourseFeeRepository,
  ) {}

  async execute(input: CourseFeeEntity): Promise<DataState<CourseFeeEntity>> {
    this.logger.debug(`Checking course fee existence`);
    const existenceCourseFee: DataState<CourseFeeEntity> =
      await this.courseFeeRepository.findById(input.id);

    if (!existenceCourseFee.data) {
      this.logger.debug(`Bank account not found`);
      throw new NotFoundException('course fee not found');
    }

    this.logger.debug(`updating course fee`);
    const result: DataState<CourseFeeEntity> =
      await this.courseFeeRepository.update(input);

    this.logger.log('Successfully updated course fee');
    return result;
  }
}

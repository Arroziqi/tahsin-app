import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { COURSE_FEE_REPO_TOKEN } from 'src/core/const/provider.token';
import { CourseFeeRepository } from 'src/features/master-data/domain/repository/course-fee.repository';

@Injectable()
export class DeleteCourseFeeUsecase
  implements UseCase<number, DataState<string>>
{
  private readonly logger = new Logger(DeleteCourseFeeUsecase.name);

  constructor(
    @Inject(COURSE_FEE_REPO_TOKEN)
    private readonly courseFeeRepository: CourseFeeRepository,
  ) {}

  async execute(input: number): Promise<DataState<string>> {
    this.logger.debug(`Checking course fee existence`);
    const existenceCourseFee = await this.courseFeeRepository.findById(input);

    if (!existenceCourseFee) {
      this.logger.warn(`course fee not found`);
      throw new NotFoundException('course fee not found');
    }

    this.logger.debug('Deleting course fee');
    const result = await this.courseFeeRepository.delete(input);

    this.logger.log('Successfully deleting course fee');
    return result;
  }
}

import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { DataState } from '../../../../../core/resources/data.state';
import { ACADEMIC_CALENDER_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { AcademicCalenderRepository } from '../../repositories/academic-calender.repository';
import { AcademicCalenderService } from '../../services/academic-calender.service';

@Injectable()
export class DeleteAcademicCalenderUsecase
  implements UseCase<number, DataState<string>>
{
  private readonly logger = new Logger(DeleteAcademicCalenderUsecase.name);
  constructor(
    @Inject(ACADEMIC_CALENDER_REPO_TOKEN)
    private readonly academicCalenderRepository: AcademicCalenderRepository,
    private readonly academicCalenderService: AcademicCalenderService,
  ) {}
  async execute(input: number): Promise<DataState<string>> {
    await this.academicCalenderService.checkExistingAcademicCalender(input);

    this.logger.debug(`Deleting academic calender`);
    const result = await this.academicCalenderRepository.delete(input);

    this.logger.log('Successfully deleted academic calender');
    return result;
  }
}

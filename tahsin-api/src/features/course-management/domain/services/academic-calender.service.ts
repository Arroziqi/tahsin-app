import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { ACADEMIC_CALENDER_REPO_TOKEN } from '../../../../core/const/provider.token';
import { AcademicCalenderRepository } from '../repositories/academic-calender.repository';

@Injectable()
export class AcademicCalenderService {
  private readonly logger = new Logger(AcademicCalenderService.name);
  constructor(
    @Inject(ACADEMIC_CALENDER_REPO_TOKEN)
    private readonly academicCalenderRepository: AcademicCalenderRepository,
  ) {}

  async checkExistingAcademicCalender(id: number): Promise<void> {
    this.logger.debug(`Checking for existing academic calender...`);
    const existingAcademicCalender =
      await this.academicCalenderRepository.findById(id);

    if (!existingAcademicCalender.data) {
      this.logger.warn(`Academic calender not found...`);
      throw new ConflictException('Academic calender not found.');
    }
  }
}

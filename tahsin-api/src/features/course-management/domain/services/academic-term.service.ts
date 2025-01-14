import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { ACADEMIC_TERMS_REPO_TOKEN } from '../../../../core/const/provider.token';
import { AcademicTermRepository } from '../repositories/academic-term.repository';
import { AcademicTermEntity } from '../entities/academic-term.entity';
import { DataState } from 'src/core/resources/data.state';

@Injectable()
export class AcademicTermService {
  private readonly logger = new Logger(AcademicTermService.name);
  constructor(
    @Inject(ACADEMIC_TERMS_REPO_TOKEN)
    private readonly academicTermRepository: AcademicTermRepository,
  ) {}

  async checkDuplicateAcademicTerm(name: string): Promise<void> {
    this.logger.debug(`Checking for duplicate academic terms...`);
    const existingAcademicTerm =
      await this.academicTermRepository.findByName(name);

    if (existingAcademicTerm.data) {
      this.logger.warn(`Academic terms already exists...`);
      throw new ConflictException('Academic terms already exists.');
    }
  }

  async checkExistingAcademicTerm(id: number): Promise<void> {
    this.logger.debug(`Checking for existing academic terms...`);
    const existingAcademicTerm = await this.academicTermRepository.findById(id);

    if (!existingAcademicTerm.data) {
      this.logger.warn(`Academic terms not found...`);
      throw new ConflictException('Academic terms not found.');
    }
  }

  async getAcademicTerm(id: number): Promise<DataState<AcademicTermEntity>> {
    await this.checkExistingAcademicTerm(id);
    return await this.academicTermRepository.findById(id);
  }
}

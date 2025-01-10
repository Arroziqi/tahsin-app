import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { DataState } from '../../../../../core/resources/data.state';
import { ACADEMIC_TERMS_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { AcademicTermRepository } from '../../repositories/academic-term.repository';
import { AcademicTermService } from '../../services/academic-term.service';

@Injectable()
export class DeleteAcademicTermUsecase
  implements UseCase<number, DataState<string>>
{
  private readonly logger = new Logger(DeleteAcademicTermUsecase.name);
  constructor(
    @Inject(ACADEMIC_TERMS_REPO_TOKEN)
    private readonly academicTermRepository: AcademicTermRepository,
    private readonly academicTermService: AcademicTermService,
  ) {}
  async execute(input: number): Promise<DataState<string>> {
    await this.academicTermService.checkExistingAcademicTerm(input);

    this.logger.debug(`Deleting academic term`);
    const result = await this.academicTermRepository.delete(input);

    this.logger.log('Successfully deleted academic term');
    return result;
  }
}

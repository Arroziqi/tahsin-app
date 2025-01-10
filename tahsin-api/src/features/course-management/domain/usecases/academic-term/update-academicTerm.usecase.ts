import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { AcademicTermEntity } from '../../entities/academic-term.entity';
import { DataState } from '../../../../../core/resources/data.state';
import { ACADEMIC_TERMS_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { AcademicTermRepository } from '../../repositories/academic-term.repository';
import { AcademicTermService } from '../../services/academic-term.service';

@Injectable()
export class UpdateAcademicTermUsecase
  implements UseCase<AcademicTermEntity, DataState<AcademicTermEntity>>
{
  private readonly logger = new Logger(UpdateAcademicTermUsecase.name);
  constructor(
    @Inject(ACADEMIC_TERMS_REPO_TOKEN)
    private readonly academicTermRepository: AcademicTermRepository,
    private readonly academicTermService: AcademicTermService,
  ) {}
  async execute(
    input: AcademicTermEntity,
  ): Promise<DataState<AcademicTermEntity>> {
    await this.academicTermService.checkExistingAcademicTerm(input.id);

    this.logger.debug('Updating academic term');
    const result = await this.academicTermRepository.update(input);

    this.logger.log('Successfully updated academic term');
    return result;
  }
}

import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { AcademicTermEntity } from '../../entities/academic-term.entity';
import { DataState } from '../../../../../core/resources/data.state';
import { AcademicTermService } from '../../services/academic-term.service';
import { ACADEMIC_TERMS_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { AcademicTermRepository } from '../../repositories/academic-term.repository';

@Injectable()
export class AddAcademicTermUsecase
  implements UseCase<AcademicTermEntity, DataState<AcademicTermEntity>>
{
  private readonly logger = new Logger(AddAcademicTermUsecase.name);
  constructor(
    private readonly academicTermService: AcademicTermService,
    @Inject(ACADEMIC_TERMS_REPO_TOKEN)
    private readonly academicTermRepository: AcademicTermRepository,
  ) {}
  async execute(
    input: AcademicTermEntity,
  ): Promise<DataState<AcademicTermEntity>> {
    await this.academicTermService.checkDuplicateAcademicTerm(input.name);

    this.logger.debug('Creating academic term');
    const result = await this.academicTermRepository.create(input);

    this.logger.log(`new academic term created`);
    return result;
  }
}

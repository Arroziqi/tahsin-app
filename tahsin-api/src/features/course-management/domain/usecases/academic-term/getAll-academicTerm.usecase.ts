import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { DataState } from '../../../../../core/resources/data.state';
import { AcademicTermEntity } from '../../entities/academic-term.entity';
import { ACADEMIC_TERMS_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { AcademicTermRepository } from '../../repositories/academic-term.repository';

@Injectable()
export class GetAllAcademicTermUsecase
  implements UseCase<void, DataState<AcademicTermEntity[]>>
{
  private readonly logger = new Logger(GetAllAcademicTermUsecase.name);
  constructor(
    @Inject(ACADEMIC_TERMS_REPO_TOKEN)
    private readonly academicTermRepository: AcademicTermRepository,
  ) {}

  async execute(): Promise<DataState<AcademicTermEntity[]>> {
    this.logger.debug('Getting all academic terms');
    const result: DataState<AcademicTermEntity[]> =
      await this.academicTermRepository.findAll();

    this.logger.log('Successfully retrieved all academic terms');
    return result;
  }
}

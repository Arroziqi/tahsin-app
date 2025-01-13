import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { DataState } from '../../../../../core/resources/data.state';
import { ClassEntity } from '../../entities/class.entity';
import { CLASS_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { ClassRepository } from '../../repositories/class.repository';

@Injectable()
export class GetAllClassUsecase
  implements UseCase<void, DataState<ClassEntity[]>>
{
  private readonly logger = new Logger(GetAllClassUsecase.name);
  constructor(
    @Inject(CLASS_REPO_TOKEN)
    private readonly classRepository: ClassRepository,
  ) {}

  async execute(): Promise<DataState<ClassEntity[]>> {
    this.logger.debug('Getting all classes');
    const result: DataState<ClassEntity[]> =
      await this.classRepository.findAll();

    this.logger.log('Successfully retrieved all classes');
    return result;
  }
}

import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { ClassEntity } from '../../entities/class.entity';
import { DataState } from '../../../../../core/resources/data.state';
import { ClassService } from '../../services/class.service';
import { CLASS_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { ClassRepository } from '../../repositories/class.repository';

@Injectable()
export class AddClassUsecase
  implements UseCase<ClassEntity, DataState<ClassEntity>>
{
  private readonly logger = new Logger(AddClassUsecase.name);
  constructor(
    private readonly classService: ClassService,
    @Inject(CLASS_REPO_TOKEN)
    private readonly classRepository: ClassRepository,
  ) {}
  async execute(input: ClassEntity): Promise<DataState<ClassEntity>> {
    await this.classService.checkDuplicateClass(input.name);

    this.logger.debug('Creating class');
    const result = await this.classRepository.create(input);

    this.logger.log(`new class created`);
    return result;
  }
}

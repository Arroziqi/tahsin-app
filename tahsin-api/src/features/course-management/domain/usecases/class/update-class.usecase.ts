import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { ClassEntity } from '../../entities/class.entity';
import { DataState } from '../../../../../core/resources/data.state';
import { CLASS_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { ClassRepository } from '../../repositories/class.repository';
import { ClassService } from '../../services/class.service';

@Injectable()
export class UpdateClassUsecase
  implements UseCase<ClassEntity, DataState<ClassEntity>>
{
  private readonly logger = new Logger(UpdateClassUsecase.name);
  constructor(
    @Inject(CLASS_REPO_TOKEN)
    private readonly classRepository: ClassRepository,
    private readonly classService: ClassService,
  ) {}
  async execute(input: ClassEntity): Promise<DataState<ClassEntity>> {
    await this.classService.checkExistingClass(input.id);

    this.logger.debug('Updating class');
    const result = await this.classRepository.update(input);

    this.logger.log('Successfully updated class');
    return result;
  }
}

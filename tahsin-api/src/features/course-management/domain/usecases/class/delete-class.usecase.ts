import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { DataState } from '../../../../../core/resources/data.state';
import { CLASS_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { ClassRepository } from '../../repositories/class.repository';
import { ClassService } from '../../services/class.service';

@Injectable()
export class DeleteClassUsecase implements UseCase<number, DataState<string>> {
  private readonly logger = new Logger(DeleteClassUsecase.name);
  constructor(
    @Inject(CLASS_REPO_TOKEN)
    private readonly classRepository: ClassRepository,
    private readonly classService: ClassService,
  ) {}
  async execute(input: number): Promise<DataState<string>> {
    await this.classService.checkExistingClass(input);

    this.logger.debug(`Deleting class`);
    const result = await this.classRepository.delete(input);

    this.logger.log('Successfully deleted class');
    return result;
  }
}

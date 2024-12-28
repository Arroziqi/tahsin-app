import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { ComponentEntity } from '../../entities/component.entity';
import { COMPONENT_REPO_TOKEN } from 'src/core/const/provider.token';
import { ComponentRepository } from '../../repository/component.repository';

@Injectable()
export class GetAllComponentUsecase
  implements UseCase<void, DataState<ComponentEntity[]>>
{
  private readonly logger = new Logger(GetAllComponentUsecase.name);

  constructor(
    @Inject(COMPONENT_REPO_TOKEN)
    private readonly componentRepository: ComponentRepository,
  ) {}

  async execute(): Promise<DataState<ComponentEntity[]>> {
    this.logger.debug('Getting all components');
    const result = await this.componentRepository.findAll();

    this.logger.log('Successfully retrieved all components');
    return result;
  }
}

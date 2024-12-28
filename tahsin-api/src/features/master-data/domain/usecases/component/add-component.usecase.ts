import { Inject, Injectable, Logger, ConflictException } from '@nestjs/common';
import { ComponentEntity } from '../../entities/component.entity';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { COMPONENT_REPO_TOKEN } from 'src/core/const/provider.token';
import { ComponentRepository } from '../../repository/component.repository';

@Injectable()
export class AddComponentUsecase
  implements UseCase<ComponentEntity, DataState<ComponentEntity>>
{
  private readonly logger = new Logger(AddComponentUsecase.name);

  constructor(
    @Inject(COMPONENT_REPO_TOKEN)
    private readonly componentRepository: ComponentRepository,
  ) {}

  async execute(input: ComponentEntity): Promise<DataState<ComponentEntity>> {
    this.logger.debug('Starting component creation');

    const existingComponent = await this.componentRepository.findByName(
      input.name,
    );

    if (existingComponent.data && existingComponent.data.id) {
      this.logger.warn('Component already exists');
      throw new ConflictException('Component already exists');
    }

    this.logger.debug('Creating new component');
    const result = await this.componentRepository.create(input);

    this.logger.log('Successfully created component');
    return result;
  }
}

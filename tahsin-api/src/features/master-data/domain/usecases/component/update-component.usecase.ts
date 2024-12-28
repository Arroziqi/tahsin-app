import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { COMPONENT_REPO_TOKEN } from 'src/core/const/provider.token';
import { ComponentRepository } from '../../repository/component.repository';
import { ComponentEntity } from '../../entities/component.entity';

@Injectable()
export class UpdateComponentUsecase
  implements UseCase<ComponentEntity, DataState<ComponentEntity>>
{
  private readonly logger = new Logger(UpdateComponentUsecase.name);

  constructor(
    @Inject(COMPONENT_REPO_TOKEN)
    private readonly componentRepository: ComponentRepository,
  ) {}

  async execute(input: ComponentEntity): Promise<DataState<ComponentEntity>> {
    this.logger.debug(`Checking component existence with id: ${input.id}`);
    const existingComponent = await this.componentRepository.findById(input.id);

    if (!existingComponent.data) {
      this.logger.warn(`Component with id ${input.id} not found`);
      throw new NotFoundException('Component not found');
    }

    this.logger.debug(`Updating component with id: ${input.id}`);
    const result = await this.componentRepository.update(input);

    this.logger.log(`Successfully updated component with id: ${input.id}`);
    return result;
  }
}

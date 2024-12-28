import {
  Body,
  Controller,
  Get,
  Logger,
  Patch,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { DataState } from 'src/core/resources/data.state';
import { ComponentEntity } from 'src/features/master-data/domain/entities/component.entity';
import { AddComponentUsecase } from 'src/features/master-data/domain/usecases/component/add-component.usecase';
import { DeleteComponentUsecase } from 'src/features/master-data/domain/usecases/component/delete-component.usecase';
import { GetAllComponentUsecase } from 'src/features/master-data/domain/usecases/component/getAll-component.usecase';
import { UpdateComponentUsecase } from 'src/features/master-data/domain/usecases/component/update-component.usecase';
import { CreateComponentPipe } from 'src/features/master-data/pipes/component/create-component.pipe';
import { UpdateComponentPipe } from 'src/features/master-data/pipes/component/update-component.pipe';
import { RolesGuard } from 'src/features/user-management/guards/roles/roles.guard';

@Controller('/api/components')
@UseGuards(RolesGuard)
@Roles(['Admin'])
export class ComponentController {
  private readonly logger = new Logger(ComponentController.name);

  constructor(
    private readonly getAllComponentUsecase: GetAllComponentUsecase,
    private readonly createComponentUsecase: AddComponentUsecase,
    private readonly updateComponentUsecase: UpdateComponentUsecase,
    private readonly deleteComponentUsecase: DeleteComponentUsecase,
  ) {}

  @Get()
  async getComponents(): Promise<DataState<ComponentEntity[]>> {
    try {
      this.logger.debug('Getting all components');
      const result = await this.getAllComponentUsecase.execute();

      this.logger.log('Successfully retrieved all components');
      return result;
    } catch (error) {
      this.logger.error('Failed to get components', { error: error.message });
      throw error;
    }
  }

  @Post()
  async createComponent(
    @Body(CreateComponentPipe) request: ComponentEntity,
  ): Promise<DataState<ComponentEntity>> {
    try {
      this.logger.debug('Creating component', { request });
      const result = await this.createComponentUsecase.execute(request);

      this.logger.log('Successfully created component');
      return result;
    } catch (error) {
      this.logger.error('Failed to create component', { error: error.message });
      throw error;
    }
  }

  @Patch(':id')
  async updateComponent(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateComponentPipe) request: ComponentEntity,
  ): Promise<DataState<ComponentEntity>> {
    try {
      this.logger.debug('Updating component', { id, request });
      const result = await this.updateComponentUsecase.execute({
        id,
        ...request,
      });

      this.logger.log('Successfully updated component');
      return result;
    } catch (error) {
      this.logger.error('Failed to update component', { error: error.message });
      throw error;
    }
  }

  @Delete(':id')
  async deleteComponent(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DataState<string>> {
    try {
      this.logger.debug('Deleting component', { id });
      const result = await this.deleteComponentUsecase.execute(id);

      this.logger.log('Successfully deleted component');
      return result;
    } catch (error) {
      this.logger.error('Failed to delete component', { error: error.message });
      throw error;
    }
  }
}

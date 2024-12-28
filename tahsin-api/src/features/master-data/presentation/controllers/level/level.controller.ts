import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/features/user-management/guards/roles/roles.guard';
import { AddLevelUsecase } from '../../../domain/usecases/level/add-level.usecase';
import { UpdateLevelUsecase } from '../../../domain/usecases/level/update-level.usecase';
import { DeleteLevelUsecase } from '../../../domain/usecases/level/delete-level.usecase';
import { GetAllLevelUsecase } from '../../../domain/usecases/level/getAll-level.usecase';
import { DataState } from 'src/core/resources/data.state';
import { LevelEntity } from '../../../domain/entities/level.entity';
import { CreateLevelPipe } from 'src/features/master-data/pipes/level/create-level.pipe';
import { UpdateLevelPipe } from 'src/features/master-data/pipes/level/update-level.pipe';

@Controller('/api/levels')
@UseGuards(RolesGuard)
@Roles(['Admin'])
export class LevelController {
  private readonly logger = new Logger(LevelController.name);

  constructor(
    private readonly getAllLevelUsecase: GetAllLevelUsecase,
    private readonly createLevelUsecase: AddLevelUsecase,
    private readonly updateLevelUsecase: UpdateLevelUsecase,
    private readonly deleteLevelUsecase: DeleteLevelUsecase,
  ) {}

  @Get()
  async getLevels(): Promise<DataState<LevelEntity[]>> {
    try {
      this.logger.debug('Getting all levels');
      const result = await this.getAllLevelUsecase.execute();

      this.logger.log('Successfully retrieved all levels');
      return result;
    } catch (error) {
      this.logger.error('Failed to get levels', { error: error.message });
      throw error;
    }
  }

  @Post()
  async createLevel(
    @Body(CreateLevelPipe) request: LevelEntity,
  ): Promise<DataState<LevelEntity>> {
    try {
      this.logger.debug('Creating level', { request });
      const result = await this.createLevelUsecase.execute(request);

      this.logger.log('Successfully created level');
      return result;
    } catch (error) {
      this.logger.error('Failed to create level', { error: error.message });
      throw error;
    }
  }

  @Patch(':id')
  async updateLevel(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateLevelPipe) request: LevelEntity,
  ): Promise<DataState<LevelEntity>> {
    try {
      this.logger.debug('Updating level', { id, request });
      const result = await this.updateLevelUsecase.execute({ id, ...request });

      this.logger.log('Successfully updated level');
      return result;
    } catch (error) {
      this.logger.error('Failed to update level', { error: error.message });
      throw error;
    }
  }

  @Delete(':id')
  async deleteLevel(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DataState<string>> {
    try {
      this.logger.debug('Deleting level', { id });
      const result = await this.deleteLevelUsecase.execute(id);

      this.logger.log('Successfully deleted level');
      return result;
    } catch (error) {
      this.logger.error('Failed to delete level', { error: error.message });
      throw error;
    }
  }
}

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
import { DataState } from 'src/core/resources/data.state';
import { DayEntity } from 'src/features/master-data/domain/entities/day.entity';
import { AddDayUsecase } from 'src/features/master-data/domain/usecases/day/add-day.usecase';
import { DeleteDayUsecase } from 'src/features/master-data/domain/usecases/day/delete-day.usecase';
import { GetAllDayUsecase } from 'src/features/master-data/domain/usecases/day/getAll-day';
import { UpdateDayUsecase } from 'src/features/master-data/domain/usecases/day/update-day.usecase';
import { CreateDayPipe } from 'src/features/master-data/pipes/day/create-day.pipe';
import { UpdateDayPipe } from 'src/features/master-data/pipes/day/update-day.pipe';
import { RolesGuard } from 'src/features/user-management/guards/roles/roles.guard';

@Controller('/api/days')
@UseGuards(RolesGuard)
@Roles(['Admin'])
export class DayController {
  private readonly logger = new Logger(DayController.name);

  constructor(
    private readonly getAllDayUsecase: GetAllDayUsecase,
    private readonly createDayUsecase: AddDayUsecase,
    private readonly updateDayUsecase: UpdateDayUsecase,
    private readonly deleteDayUsecase: DeleteDayUsecase,
  ) {}

  @Get()
  async getDays(): Promise<DataState<DayEntity[]>> {
    try {
      this.logger.debug('Getting all days');
      const result = await this.getAllDayUsecase.execute();

      this.logger.log('Successfully retrieved all days');
      return result;
    } catch (error) {
      this.logger.error('Failed to get days', { error: error.message });
      throw error;
    }
  }

  @Post()
  async createDay(
    @Body(CreateDayPipe) request: DayEntity,
  ): Promise<DataState<DayEntity>> {
    try {
      this.logger.debug('Creating day', { request });
      const result = await this.createDayUsecase.execute(request);

      this.logger.log('Successfully created day');
      return result;
    } catch (error) {
      this.logger.error('Failed to create day', { error: error.message });
      throw error;
    }
  }

  @Patch(':id')
  async updateDay(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateDayPipe) request: DayEntity,
  ): Promise<DataState<DayEntity>> {
    try {
      this.logger.debug('Updating day', { id, request });
      const result = await this.updateDayUsecase.execute({ id, ...request });

      this.logger.log('Successfully updated day');
      return result;
    } catch (error) {
      this.logger.error('Failed to update day', { error: error.message });
      throw error;
    }
  }

  @Delete(':id')
  async deleteDay(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DataState<string>> {
    try {
      this.logger.debug('Deleting day', { id });
      const result = await this.deleteDayUsecase.execute(id);

      this.logger.log('Successfully deleted day');
      return result;
    } catch (error) {
      this.logger.error('Failed to delete day', { error: error.message });
      throw error;
    }
  }
}

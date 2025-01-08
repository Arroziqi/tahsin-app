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
import { RolesGuard } from 'src/features/user-management/guards/roles/roles.guard';
import { UpdateScheduleUsecase } from '../../../domain/usecases/schedule/update-schedule.usecase';
import { GetAllScheduleUsecase } from '../../../domain/usecases/schedule/getAll-schedule';
import { AddScheduleUsecase } from '../../../domain/usecases/schedule/add-schedule.usecase';
import { DeleteScheduleUsecase } from '../../../domain/usecases/schedule/delete-schedule.usecase';
import { ScheduleEntity } from '../../../domain/entities/schedule.entity';
import { CreateSchedulePipe } from '../../../pipes/schedule/create-day.pipe';
import { UpdateSchedulePipe } from '../../../pipes/schedule/update-day.pipe';

@Controller('/api/schedules')
@UseGuards(RolesGuard)
@Roles(['Admin'])
export class ScheduleController {
  private readonly logger = new Logger(ScheduleController.name);

  constructor(
    private readonly getAllScheduleUsecase: GetAllScheduleUsecase,
    private readonly createScheduleUsecase: AddScheduleUsecase,
    private readonly updateScheduleUsecase: UpdateScheduleUsecase,
    private readonly deleteScheduleUsecase: DeleteScheduleUsecase,
  ) {}

  @Get()
  async getSchedules(): Promise<DataState<ScheduleEntity[]>> {
    try {
      this.logger.debug('Getting all schedules');
      const result = await this.getAllScheduleUsecase.execute();

      this.logger.log('Successfully retrieved all schedules');
      return result;
    } catch (error) {
      this.logger.error('Failed to get schedules', { error: error.message });
      throw error;
    }
  }

  @Post()
  async createSchedule(
    @Body(CreateSchedulePipe) request: ScheduleEntity,
  ): Promise<DataState<ScheduleEntity>> {
    try {
      this.logger.debug('Creating schedule', { request });
      const result = await this.createScheduleUsecase.execute(request);

      this.logger.log('Successfully created schedule');
      return result;
    } catch (error) {
      this.logger.error('Failed to create schedule', { error: error.message });
      throw error;
    }
  }

  @Patch(':id')
  async updateSchedule(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateSchedulePipe) request: ScheduleEntity,
  ): Promise<DataState<ScheduleEntity>> {
    try {
      this.logger.debug('Updating schedule', { id, request });
      const result = await this.updateScheduleUsecase.execute({
        id,
        ...request,
      });

      this.logger.log('Successfully updated schedule');
      return result;
    } catch (error) {
      this.logger.error('Failed to update schedule', { error: error.message });
      throw error;
    }
  }

  @Delete(':id')
  async deleteSchedule(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DataState<string>> {
    try {
      this.logger.debug('Deleting schedule', { id });
      const result = await this.deleteScheduleUsecase.execute(id);

      this.logger.log('Successfully deleted schedule');
      return result;
    } catch (error) {
      this.logger.error('Failed to delete schedule', { error: error.message });
      throw error;
    }
  }
}

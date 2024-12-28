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
import { TimeEntity } from 'src/features/master-data/domain/entities/time.entity';
import { AddTimeUsecase } from 'src/features/master-data/domain/usecases/time/add-time.usecase';
import { DeleteTimeUsecase } from 'src/features/master-data/domain/usecases/time/delete-time.usecase';
import { GetAllTimeUsecase } from 'src/features/master-data/domain/usecases/time/getAll-time.usecase';
import { UpdateTimeUsecase } from 'src/features/master-data/domain/usecases/time/update-time.usecase';
import { CreateTimePipe } from 'src/features/master-data/pipes/time/create-time.pipe';
import { UpdateTimePipe } from 'src/features/master-data/pipes/time/update-time.pipe';
import { RolesGuard } from 'src/features/user-management/guards/roles/roles.guard';

@Controller('/api/times')
@UseGuards(RolesGuard)
@Roles(['Admin'])
export class TimeController {
  private readonly logger = new Logger(TimeController.name);

  constructor(
    private readonly getAllTimeUsecase: GetAllTimeUsecase,
    private readonly createTimeUsecase: AddTimeUsecase,
    private readonly updateTimeUsecase: UpdateTimeUsecase,
    private readonly deleteTimeUsecase: DeleteTimeUsecase,
  ) {}

  @Get()
  async getTimes(): Promise<DataState<TimeEntity[]>> {
    try {
      this.logger.debug('Getting all times');
      const result = await this.getAllTimeUsecase.execute();

      this.logger.log('Successfully retrieved all times');
      return result;
    } catch (error) {
      this.logger.error('Failed to get times', { error: error.message });
      throw error;
    }
  }

  @Post()
  async createTime(
    @Body(CreateTimePipe) request: TimeEntity,
  ): Promise<DataState<TimeEntity>> {
    try {
      this.logger.debug('Creating time', { request });
      const result = await this.createTimeUsecase.execute(request);

      this.logger.log('Successfully created time');
      return result;
    } catch (error) {
      this.logger.error('Failed to create time', { error: error.message });
      throw error;
    }
  }

  @Patch(':id')
  async updateTime(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateTimePipe) request: TimeEntity,
  ): Promise<DataState<TimeEntity>> {
    try {
      this.logger.debug('Updating time', { id, request });
      const result = await this.updateTimeUsecase.execute({ id, ...request });

      this.logger.log('Successfully updated time');
      return result;
    } catch (error) {
      this.logger.error('Failed to update time', { error: error.message });
      throw error;
    }
  }

  @Delete(':id')
  async deleteTime(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DataState<string>> {
    try {
      this.logger.debug('Deleting time', { id });
      const result = await this.deleteTimeUsecase.execute(id);

      this.logger.log('Successfully deleted time');
      return result;
    } catch (error) {
      this.logger.error('Failed to delete time', { error: error.message });
      throw error;
    }
  }
}

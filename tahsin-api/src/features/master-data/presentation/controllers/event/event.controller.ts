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
import { EventEntity } from 'src/features/master-data/domain/entities/event.entity';
import { AddEventUsecase } from 'src/features/master-data/domain/usecases/event/add-event.usecase';
import { DeleteEventUsecase } from 'src/features/master-data/domain/usecases/event/delete-event.usecase';
import { GetAllEventUsecase } from 'src/features/master-data/domain/usecases/event/getAll-event.usecase';
import { UpdateEventUsecase } from 'src/features/master-data/domain/usecases/event/update-event.usecase';
import { CreateEventPipe } from 'src/features/master-data/pipes/event/create-event.pipe';
import { UpdateEventPipe } from 'src/features/master-data/pipes/event/update-event.pipe';
import { RolesGuard } from 'src/features/user-management/guards/roles/roles.guard';

@Controller('/api/events')
@UseGuards(RolesGuard)
@Roles(['Admin'])
export class EventController {
  private readonly logger = new Logger(EventController.name);

  constructor(
    private readonly getAllEventUsecase: GetAllEventUsecase,
    private readonly createEventUsecase: AddEventUsecase,
    private readonly updateEventUsecase: UpdateEventUsecase,
    private readonly deleteEventUsecase: DeleteEventUsecase,
  ) {}

  @Get()
  async getEvents(): Promise<DataState<EventEntity[]>> {
    try {
      this.logger.debug('Getting all events');
      const result = await this.getAllEventUsecase.execute();

      this.logger.log('Successfully retrieved all events');
      return result;
    } catch (error) {
      this.logger.error('Failed to get events', { error: error.message });
      throw error;
    }
  }

  @Post()
  async createEvent(
    @Body(CreateEventPipe) request: EventEntity,
  ): Promise<DataState<EventEntity>> {
    try {
      this.logger.debug('Creating event', { request });
      const result = await this.createEventUsecase.execute(request);

      this.logger.log('Successfully created event');
      return result;
    } catch (error) {
      this.logger.error('Failed to create event', { error: error.message });
      throw error;
    }
  }

  @Patch(':id')
  async updateEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateEventPipe) request: EventEntity,
  ): Promise<DataState<EventEntity>> {
    try {
      this.logger.debug('Updating event', { id, request });
      const result = await this.updateEventUsecase.execute({ id, ...request });

      this.logger.log('Successfully updated event');
      return result;
    } catch (error) {
      this.logger.error('Failed to update event', { error: error.message });
      throw error;
    }
  }

  @Delete(':id')
  async deleteEvent(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DataState<string>> {
    try {
      this.logger.debug('Deleting event', { id });
      const result = await this.deleteEventUsecase.execute(id);

      this.logger.log('Successfully deleted event');
      return result;
    } catch (error) {
      this.logger.error('Failed to delete event', { error: error.message });
      throw error;
    }
  }
}

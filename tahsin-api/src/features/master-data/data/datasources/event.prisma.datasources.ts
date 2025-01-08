import {
  DataFailed,
  DataState,
  DataSuccess,
} from 'src/core/resources/data.state';
import { EventModel } from 'src/features/master-data/data/models/event.model';
import { Injectable, Logger } from '@nestjs/common';
import { ErrorEntity } from 'src/core/domain/entities/error.entity';
import { PrismaService } from 'src/common/services/prisma.service';

export interface EventPrismaDatasources {
  findById(
    id: number,
    includeCalendar?: boolean,
  ): Promise<DataState<EventModel>>;

  findByName(
    name: string,
    includeCalendar?: boolean,
  ): Promise<DataState<EventModel>>;

  findAll(includeCalendar?: boolean): Promise<DataState<EventModel[]>>;

  create(event: EventModel): Promise<DataState<EventModel>>;

  update(event: EventModel): Promise<DataState<EventModel>>;

  delete(id: number): Promise<DataState<string>>;
}

@Injectable()
export class EventPrismaDataSourcesImpl implements EventPrismaDatasources {
  private readonly logger: Logger = new Logger(EventPrismaDataSourcesImpl.name);

  constructor(private readonly prismaService: PrismaService) {}

  async findById(
    id: number,
    includeCalendar?: boolean,
  ): Promise<DataState<EventModel>> {
    try {
      this.logger.log(`Finding event with id: ${id}`);
      const data = await this.prismaService.event.findFirst({
        where: { id },
      });

      if (!data) {
        this.logger.warn(`Event with id: ${id} not found`);
        throw new ErrorEntity(404, 'Event not found');
      }

      this.logger.log(`Successfully find event with id: ${id}`);
      return new DataSuccess(new EventModel(data));
    } catch (error) {
      this.logger.error(`Error finding event with id ${id}: ${error.message}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findByName(
    name: string,
    includeCalendar?: boolean,
  ): Promise<DataState<EventModel>> {
    try {
      this.logger.log(`Finding event with name: ${name}`);
      const data = await this.prismaService.event.findFirst({
        where: { name },
      });

      if (!data) {
        this.logger.warn(`Event with name: ${name} not found`);
        return new DataFailed(new ErrorEntity(404, 'Event not found'));
      }

      this.logger.log(`Successfully found event with name: ${name}`);
      return new DataSuccess(new EventModel(data));
    } catch (error) {
      this.logger.error(`Error finding event with name: ${name}`);
      throw new ErrorEntity(500, error.message);
    }
  }

  async findAll(includeCalendar?: boolean): Promise<DataState<EventModel[]>> {
    try {
      this.logger.log('Finding all events');
      const data = await this.prismaService.event.findMany({
        orderBy: {
          id: 'asc',
        },
      });

      if (!data || data.length === 0) {
        this.logger.warn('No events found');
        throw new ErrorEntity(404, 'Events not found');
      }

      this.logger.log('Successfully found all events');
      return new DataSuccess(data.map((event) => new EventModel(event)));
    } catch (error) {
      this.logger.error(`Error finding all events: ${error.message}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async create(event: EventModel): Promise<DataState<EventModel>> {
    try {
      this.logger.log('Creating event');
      const data = await this.prismaService.event.create({
        data: event,
      });

      this.logger.log(`Successfully created event with id: ${data.id}`);
      return new DataSuccess(new EventModel(data));
    } catch (error) {
      this.logger.error(`Error creating event: ${error.message}`);
      throw new ErrorEntity(500, error.message);
    }
  }

  async update(event: EventModel): Promise<DataState<EventModel>> {
    try {
      this.logger.log(`Updating event with id: ${event.id}`);
      const data = await this.prismaService.event.update({
        where: { id: event.id },
        data: event,
      });

      this.logger.log(`Successfully updated event with id: ${event.id}`);
      return new DataSuccess(new EventModel(data));
    } catch (error) {
      this.logger.error(`Error updating event with id: ${event.id}`);
      throw new ErrorEntity(500, error.message);
    }
  }

  async delete(id: number): Promise<DataState<string>> {
    try {
      this.logger.log(`Deleting event with id: ${id}`);
      await this.prismaService.event.delete({
        where: { id },
      });

      this.logger.log(`Successfully deleted event with id: ${id}`);
      return new DataSuccess('OK');
    } catch (error) {
      this.logger.error(`Error deleting event with id: ${id}`);
      throw new ErrorEntity(500, error.message);
    }
  }
}

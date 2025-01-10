import {
  DataFailed,
  DataState,
  DataSuccess,
} from 'src/core/resources/data.state';
import { DayModel } from 'src/features/master-data/data/models/day.model';
import { Injectable, Logger } from '@nestjs/common';
import { ErrorEntity } from 'src/core/domain/entities/error.entity';
import { PrismaService } from 'src/common/services/prisma.service';
import { DaysEnum } from 'src/core/types/enum/days.enum';

export interface DayPrismaDatasources {
  findById(id: number, includeSchedule?: boolean): Promise<DataState<DayModel>>;

  findByName(
    name: DaysEnum,
    includeSchedule?: boolean,
  ): Promise<DataState<DayModel>>;

  findAll(includeSchedule?: boolean): Promise<DataState<DayModel[]>>;

  create(day: DayModel): Promise<DataState<DayModel>>;

  update(day: DayModel): Promise<DataState<DayModel>>;

  delete(id: number): Promise<DataState<string>>;
}

@Injectable()
export class DayPrismaDataSourcesImpl implements DayPrismaDatasources {
  private readonly logger: Logger = new Logger(DayPrismaDataSourcesImpl.name);

  constructor(private readonly prismaService: PrismaService) {}

  async findById(
    id: number,
    includeSchedule?: boolean,
  ): Promise<DataState<DayModel>> {
    try {
      this.logger.log(`Finding day with id: ${id}`);
      const data = await this.prismaService.day.findFirst({
        where: { id },
        include: {
          schedules: includeSchedule,
        },
      });

      if (!data) {
        this.logger.warn(`Day with id: ${id} not found`);
        throw new ErrorEntity(404, 'Day not found');
      }

      this.logger.log(`Successfully find day with id: ${id}`);
      return new DataSuccess(new DayModel(data));
    } catch (error) {
      this.logger.error(`Error finding day with id ${id}: ${error.message}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findByName(
    name: DaysEnum,
    includeSchedule?: boolean,
  ): Promise<DataState<DayModel>> {
    try {
      this.logger.log(`Finding day with name: ${name}`);
      const data = await this.prismaService.day.findFirst({
        where: { name },
        include: {
          schedules: includeSchedule,
        },
      });

      if (!data) {
        this.logger.warn(`Day with name: ${name} not found`);
        return new DataFailed(new ErrorEntity(404, 'Day not found'));
      }

      this.logger.log(`Successfully found day with name: ${name}`);
      return new DataSuccess(new DayModel(data));
    } catch (error) {
      this.logger.error(`Error finding day with name: ${name}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findAll(includeSchedule?: boolean): Promise<DataState<DayModel[]>> {
    try {
      this.logger.log('Finding all days');
      const data = await this.prismaService.day.findMany({
        include: {
          schedules: includeSchedule,
        },
        orderBy: {
          id: 'asc',
        },
      });

      if (!data || data.length === 0) {
        this.logger.warn('No days found');
        throw new ErrorEntity(404, 'Days not found');
      }

      this.logger.log('Successfully found all days');
      return new DataSuccess(data.map((day) => new DayModel(day)));
    } catch (error) {
      this.logger.error(`Error finding all days: ${error.message}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async create(day: DayModel): Promise<DataState<DayModel>> {
    try {
      this.logger.log('Creating day');
      const data = await this.prismaService.day.create({
        data: day,
      });

      this.logger.log(`Successfully created day with id: ${data.id}`);
      return new DataSuccess(new DayModel(data));
    } catch (error) {
      this.logger.error(`Error creating day: ${error.message}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async update(day: DayModel): Promise<DataState<DayModel>> {
    try {
      this.logger.log(`Updating day with id: ${day.id}`);
      const data = await this.prismaService.day.update({
        where: { id: day.id },
        data: day,
      });

      this.logger.log(`Successfully updated day with id: ${day.id}`);
      return new DataSuccess(new DayModel(data));
    } catch (error) {
      this.logger.error(`Error updating day with id: ${day.id}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async delete(id: number): Promise<DataState<string>> {
    try {
      this.logger.log(`Deleting day with id: ${id}`);
      await this.prismaService.day.delete({
        where: { id },
      });

      this.logger.log(`Successfully deleted day with id: ${id}`);
      return new DataSuccess('OK');
    } catch (error) {
      this.logger.error(`Error deleting day with id: ${id}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
}

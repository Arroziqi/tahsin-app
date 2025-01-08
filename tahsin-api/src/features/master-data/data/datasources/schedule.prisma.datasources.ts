import {
  DataFailed,
  DataState,
  DataSuccess,
} from 'src/core/resources/data.state';
import { Injectable, Logger } from '@nestjs/common';
import { ScheduleModel } from '../models/schedule.model';
import { MeetingTypeEnum } from '@prisma/client';
import { PrismaService } from '../../../../common/services/prisma.service';
import { ErrorEntity } from '../../../../core/domain/entities/error.entity';

export interface SchedulePrismaDatasources {
  findById(id: number): Promise<DataState<ScheduleModel>>;
  findByDayId(day_id: number): Promise<DataState<ScheduleModel[]>>;
  findByTimeId(time_id: number): Promise<DataState<ScheduleModel[]>>;
  findByType(type: MeetingTypeEnum): Promise<DataState<ScheduleModel[]>>;

  findAll(): Promise<DataState<ScheduleModel[]>>;

  create(schedule: ScheduleModel): Promise<DataState<ScheduleModel>>;

  update(schedule: ScheduleModel): Promise<DataState<ScheduleModel>>;

  delete(id: number): Promise<DataState<string>>;
}

@Injectable()
export class SchedulePrismaDatasourcesImpl
  implements SchedulePrismaDatasources
{
  private readonly logger = new Logger(SchedulePrismaDatasourcesImpl.name);
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: number): Promise<DataState<ScheduleModel>> {
    try {
      this.logger.log('finding schedule by id');
      const data = await this.prismaService.schedules.findFirst({
        where: { id },
        include: {
          Day: true,
          Time: true,
        },
      });

      if (!data) {
        this.logger.warn(`schedule not found`);
        throw new ErrorEntity(404, 'schedule not found');
      }

      this.logger.log(`successfully find schedule by id`);
      return new DataSuccess(new ScheduleModel(data));
    } catch (err) {
      this.logger.error(`error finding schedule by id: ${err.message}`);
      throw new ErrorEntity(err.statusCode, err.message);
    }
  }
  async findByDayId(day_id: number): Promise<DataState<ScheduleModel[]>> {
    try {
      this.logger.log('finding schedule by day_id');
      const data = await this.prismaService.schedules.findMany({
        where: { day_id },
        include: {
          Day: true,
          Time: true,
        },
        orderBy: {
          id: 'asc',
        },
      });

      if (!data || data.length === 0) {
        this.logger.warn(`schedule not found`);
        return new DataFailed(new ErrorEntity(404, 'schedule not found'));
      }

      this.logger.log(`successfully find schedule by day_id`);
      return new DataSuccess(
        data.map((schedule): ScheduleModel => new ScheduleModel(schedule)),
      );
    } catch (err) {
      this.logger.error(`error finding schedule by day_id: ${err.message}`);
      throw new ErrorEntity(err.statusCode, err.message);
    }
  }
  async findByTimeId(time_id: number): Promise<DataState<ScheduleModel[]>> {
    try {
      this.logger.log('finding schedule by time_id');
      const data = await this.prismaService.schedules.findMany({
        where: { time_id },
        include: {
          Day: true,
          Time: true,
        },
        orderBy: {
          id: 'asc',
        },
      });

      if (!data || data.length === 0) {
        this.logger.warn(`schedule not found`);
        return new DataFailed(new ErrorEntity(404, 'schedule not found'));
      }

      this.logger.log(`successfully find schedule by time_id`);
      return new DataSuccess(
        data.map((schedule): ScheduleModel => new ScheduleModel(schedule)),
      );
    } catch (err) {
      this.logger.error(`error finding schedule by time_id: ${err.message}`);
      throw new ErrorEntity(err.statusCode, err.message);
    }
  }
  async findByType(type: MeetingTypeEnum): Promise<DataState<ScheduleModel[]>> {
    try {
      this.logger.log('finding schedule by type');
      const data = await this.prismaService.schedules.findMany({
        where: { type },
        include: {
          Day: true,
          Time: true,
        },
        orderBy: {
          id: 'asc',
        },
      });

      if (!data || data.length === 0) {
        this.logger.warn(`schedule not found`);
        return new DataFailed(new ErrorEntity(404, 'schedule not found'));
      }

      this.logger.log(`successfully find schedule by type`);
      return new DataSuccess(
        data.map((schedule): ScheduleModel => new ScheduleModel(schedule)),
      );
    } catch (err) {
      this.logger.error(`error finding schedule by type: ${err.message}`);
      throw new ErrorEntity(err.statusCode, err.message);
    }
  }
  async findAll(): Promise<DataState<ScheduleModel[]>> {
    try {
      this.logger.log('finding all schedules');
      const data = await this.prismaService.schedules.findMany({
        include: {
          Day: true,
          Time: true,
        },
        orderBy: {
          id: 'asc',
        },
      });

      if (!data || data.length === 0) {
        this.logger.warn(`schedule not found`);
        throw new ErrorEntity(404, 'schedule not found');
      }

      this.logger.log(`successfully find all schedules`);
      return new DataSuccess(
        data.map((schedule): ScheduleModel => new ScheduleModel(schedule)),
      );
    } catch (err) {
      this.logger.error(`error finding all schedules: ${err.message}`);
      throw new ErrorEntity(err.statusCode, err.message);
    }
  }
  async create(schedule: ScheduleModel): Promise<DataState<ScheduleModel>> {
    const { id, Time, Day, ...createData } = schedule;
    try {
      this.logger.log('creating schedule');
      const data = await this.prismaService.schedules.create({
        data: createData,
        include: {
          Day: true,
          Time: true,
        },
      });

      this.logger.log('successfully create schedule');
      return new DataSuccess(new ScheduleModel(data));
    } catch (e) {
      this.logger.error(`error creating schedule: ${e.message}`);
      throw new ErrorEntity(e.statusCode, e.message);
    }
  }
  async update(schedule: ScheduleModel): Promise<DataState<ScheduleModel>> {
    const { id, Time, Day, ...updateData } = schedule;
    try {
      this.logger.log('updating schedule');
      const data = await this.prismaService.schedules.update({
        where: { id },
        data: updateData,
        include: {
          Day: true,
          Time: true,
        },
      });

      this.logger.log('successfully update schedule');
      return new DataSuccess(new ScheduleModel(data));
    } catch (e) {
      this.logger.error(`error updating schedule: ${e.message}`);
      throw new ErrorEntity(e.statusCode, e.message);
    }
  }
  async delete(id: number): Promise<DataState<string>> {
    try {
      this.logger.log('deleting schedule');
      const data = await this.prismaService.schedules.delete({
        where: { id },
      });

      this.logger.log('successfully delete schedule');
      return new DataSuccess('OK');
    } catch (e) {
      this.logger.error(`error deleting schedule: ${e.message}`);
      throw new ErrorEntity(e.statusCode, e.message);
    }
  }
}

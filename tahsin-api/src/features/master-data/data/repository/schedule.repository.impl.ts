import { Inject, Injectable } from '@nestjs/common';
import { DataState } from 'src/core/resources/data.state';
import { SCHEDULE_REPO_TOKEN } from 'src/core/const/provider.token';
import { ScheduleRepository } from '../../domain/repository/schedule.repository';
import { MeetingTypeEnum } from '@prisma/client';
import { ScheduleEntity } from '../../domain/entities/schedule.entity';

@Injectable()
export class ScheduleRepositoryImpl implements ScheduleRepository {
  constructor(
    @Inject(SCHEDULE_REPO_TOKEN)
    private readonly scheduleRepository: ScheduleRepository,
  ) {}

  async findByDayId(day_id: number): Promise<DataState<ScheduleEntity[]>> {
    return await this.scheduleRepository.findByDayId(day_id);
  }
  async findByTimeId(time_id: number): Promise<DataState<ScheduleEntity[]>> {
    return await this.scheduleRepository.findByTimeId(time_id);
  }
  async findByType(
    type: MeetingTypeEnum,
  ): Promise<DataState<ScheduleEntity[]>> {
    return await this.scheduleRepository.findByType(type);
  }

  async findById(id: number): Promise<DataState<ScheduleEntity>> {
    return await this.scheduleRepository.findById(id);
  }

  async findAll(): Promise<DataState<ScheduleEntity[]>> {
    return await this.scheduleRepository.findAll();
  }

  async create(schedule: ScheduleEntity): Promise<DataState<ScheduleEntity>> {
    return await this.scheduleRepository.create(schedule);
  }

  async update(schedule: ScheduleEntity): Promise<DataState<ScheduleEntity>> {
    return await this.scheduleRepository.update(schedule);
  }

  async delete(id: number): Promise<DataState<string>> {
    return await this.scheduleRepository.delete(id);
  }
}

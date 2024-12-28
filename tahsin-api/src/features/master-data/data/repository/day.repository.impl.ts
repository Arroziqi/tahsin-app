import { Inject, Injectable } from '@nestjs/common';
import { DayRepository } from '../../domain/repository/day.repository';
import { DataState } from 'src/core/resources/data.state';
import { DayEntity } from '../../domain/entities/day.entity';
import { DAY_REPO_TOKEN } from 'src/core/const/provider.token';
import { DaysEnum } from 'src/core/types/enum/days.enum';

@Injectable()
export class DayRepositoryImpl implements DayRepository {
  constructor(
    @Inject(DAY_REPO_TOKEN) private readonly dayRepository: DayRepository,
  ) {}

  async findById(
    id: number,
    includeSchedule?: boolean,
  ): Promise<DataState<DayEntity>> {
    return await this.dayRepository.findById(id, includeSchedule);
  }

  async findByName(
    name: DaysEnum,
    includeSchedule?: boolean,
  ): Promise<DataState<DayEntity>> {
    return await this.dayRepository.findByName(name, includeSchedule);
  }

  async findAll(includeSchedule?: boolean): Promise<DataState<DayEntity[]>> {
    return await this.dayRepository.findAll(includeSchedule);
  }

  async create(day: DayEntity): Promise<DataState<DayEntity>> {
    return await this.dayRepository.create(day);
  }

  async update(day: DayEntity): Promise<DataState<DayEntity>> {
    return await this.dayRepository.update(day);
  }

  async delete(id: number): Promise<DataState<string>> {
    return await this.dayRepository.delete(id);
  }
}

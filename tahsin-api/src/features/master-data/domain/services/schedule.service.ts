import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { SCHEDULE_REPO_TOKEN } from 'src/core/const/provider.token';
import { ScheduleRepository } from '../repository/schedule.repository';
import { ScheduleEntity } from '../entities/schedule.entity';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(
    @Inject(SCHEDULE_REPO_TOKEN) private scheduleRepository: ScheduleRepository,
  ) {}

  async checkDuplicateSchedule(schedule: ScheduleEntity): Promise<void> {
    this.logger.debug(`Checking existing schedule`);

    const existingScheduleWithDayId = await this.scheduleRepository.findByDayId(
      schedule.day_id,
    );

    const existingScheduleWithTimeId =
      await this.scheduleRepository.findByTimeId(schedule.day_id);

    const existingScheduleWithType = await this.scheduleRepository.findByType(
      schedule.type,
    );

    if (
      existingScheduleWithType.data &&
      existingScheduleWithTimeId.data &&
      existingScheduleWithDayId.data
    ) {
      this.logger.warn(`Schedule already exists`);
      throw new ConflictException('Schedule already exists');
    }
  }

  async checkExistingSchedule(id: number): Promise<void> {
    this.logger.debug(`Checking existing schedule with id: ${id}`);

    const existingSchedule = await this.scheduleRepository.findById(id);

    if (!existingSchedule.data) {
      this.logger.warn(`Schedule with id ${id} not found`);
      throw new NotFoundException(`Schedule with id ${id} not found`);
    }
  }
}

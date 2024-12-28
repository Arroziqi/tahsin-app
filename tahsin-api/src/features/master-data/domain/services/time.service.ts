import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { TIME_REPO_TOKEN } from 'src/core/const/provider.token';
import { TimeRepository } from 'src/features/master-data/domain/repository/time.repository';
import { TimeHelper } from 'src/common/helper/time.helper';
import { TimeEntity } from 'src/features/master-data/domain/entities/time.entity';

@Injectable()
export class TimeService {
  private readonly logger = new Logger(TimeService.name);

  constructor(
    @Inject(TIME_REPO_TOKEN) private timeRepository: TimeRepository,
    private readonly timeHelper: TimeHelper,
  ) {}

  checkDurationTime(start: number, end: number, duration: number = 120): void {
    this.logger.debug(`Checking duration`);
    const isDurationValid = this.timeHelper.isDurationValid(
      start,
      end,
      duration,
    );

    if (!isDurationValid.status) {
      this.logger.warn(`duration not valid`);
      throw new BadRequestException(isDurationValid.message);
    }
  }

  async checkOverlappingTime(input: TimeEntity): Promise<void> {
    this.logger.debug(`Checking overlapping time`);
    const overlappingTime = await this.timeRepository.findOverlappingTime(
      input,
      true,
    );

    if (overlappingTime.data && overlappingTime.data.id !== input.id) {
      const overlappingDetails = overlappingTime.data;
      this.logger.warn(
        `overlapping time with session_name: '${overlappingDetails.session_name}', start_time: ${overlappingDetails.start_time}, end_time: ${overlappingDetails.end_time}`,
      );
      throw new ConflictException(
        `overlapping time with session_name: '${overlappingDetails.session_name}', start_time: ${overlappingDetails.start_time}, end_time: ${overlappingDetails.end_time}`,
      );
    }
  }

  async checkExistingTime(id: number): Promise<void> {
    this.logger.debug(`Checking if time exists with id: ${id}`);
    const existingTime = await this.timeRepository.findById(id, true);

    if (!existingTime.data) {
      this.logger.warn(`Time with id: ${id} not found`);
      throw new NotFoundException('Time not found');
    }
  }
}

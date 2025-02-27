import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { AddTimeSchema } from '../../presentation/dto/time/add-time.dto';
import { TimeHelper } from 'src/common/helper/time.helper';

@Injectable()
export class CreateTimePipe implements PipeTransform {
  private readonly logger = new Logger(CreateTimePipe.name);

  constructor(private readonly timeHelper: TimeHelper) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.log(`Starting request validation`);

    const result = AddTimeSchema.safeParse(value);

    if (!result.success) {
      this.logger.error(
        `Request validation failed: ${JSON.stringify(result.error.errors)}`,
      );
      throw new BadRequestException(result.error.errors);
    }

    const convertedData = {
      ...result.data,
      start_time: this.timeHelper.hourToMinutes(result.data.start_time),
      end_time: this.timeHelper.hourToMinutes(result.data.end_time),
    };

    this.logger.log(`Request validation successful`);
    return convertedData;
  }
}

import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { UpdateBankAccountSchema } from 'src/features/master-data/presentation/dto/bank-account/update-bank-account.dto';

@Injectable()
export class UpdateBankAccountPipe implements PipeTransform {
  private readonly logger = new Logger(UpdateBankAccountPipe.name);

  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting request validation');

    const result = UpdateBankAccountSchema.safeParse(value);

    if (!result.success) {
      this.logger.error('Request validation failed', result.error.errors);
      throw new BadRequestException(result.error.errors);
    }

    this.logger.debug('Request validation successful');
    return result.data;
  }
}

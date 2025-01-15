import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { UpdatePaymentConfirmationSchema } from '../../presentation/dto/payment-confirmation/update-paymentConfirmation.dto';

@Injectable()
export class UpdatePaymentConfirmationPipe implements PipeTransform {
  private readonly logger = new Logger(UpdatePaymentConfirmationPipe.name);

  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting request validation');

    const result = UpdatePaymentConfirmationSchema.safeParse(value);

    if (!result.success) {
      this.logger.error('Request validation failed', result.error.errors);
      throw new BadRequestException(result.error.errors);
    }

    this.logger.debug('Request validation successful');
    return result.data;
  }
}

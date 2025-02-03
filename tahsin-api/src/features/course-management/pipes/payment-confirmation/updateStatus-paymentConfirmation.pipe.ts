import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { UpdateStatusPaymentConfirmationSchema } from '../../presentation/dto/payment-confirmation/updateStatus-paymentConfirmation.dto';

@Injectable()
export class UpdateStatusPaymentConfirmationPipe implements PipeTransform {
  private readonly logger = new Logger(
    UpdateStatusPaymentConfirmationPipe.name,
  );

  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting request validation');

    const { admin_id, ...req } = value;

    const result = UpdateStatusPaymentConfirmationSchema.safeParse(req);

    if (!result.success) {
      this.logger.error('Request validation failed', result.error.errors);
      throw new BadRequestException(result.error.errors);
    }

    this.logger.debug('Request validation successful');
    return { ...result.data, admin_id: admin_id };
  }
}

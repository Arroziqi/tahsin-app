import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { AddPaymentConfirmationSchema } from '../../presentation/dto/payment-confirmation/add-paymentConfirmation.dto';

@Injectable()
export class AddPaymentConfirmationPipe implements PipeTransform {
  private readonly logger = new Logger(AddPaymentConfirmationPipe.name);

  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting request validation');

    const { user_id, ...data } = value;
    const inputData = { ...data, student_id: user_id };

    const result = AddPaymentConfirmationSchema.safeParse(inputData);

    if (!result.success) {
      this.logger.error('Request validation failed', result.error.errors);
      throw new BadRequestException(result.error.errors);
    }

    this.logger.debug('Request validation successful');
    return result.data;
  }
}

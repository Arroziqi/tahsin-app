import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { AddManyPaymentConfirmationSchema } from '../../presentation/dto/payment-confirmation/addMany-paymentConfirmation.dto';

@Injectable()
export class AddManyPaymentConfirmationPipe implements PipeTransform {
  private readonly logger = new Logger(AddManyPaymentConfirmationPipe.name);

  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting request validation');

    const { admin_id, ...req } = value;

    if (typeof req !== 'object' || !Object.keys(req).length) {
      this.logger.error('Expected req to be an array of payment confirmations');
      throw new BadRequestException(
        'Invalid input: req should be an array of payment confirmations',
      );
    }

    const paymentConfirmations = Array.isArray(req) ? req : Object.values(req);

    const results = paymentConfirmations.map((item: any) => {
      return AddManyPaymentConfirmationSchema.safeParse(item);
    });

    const errors = results
      .filter((result) => !result.success)
      .map((result) => result.error.errors);
    if (errors.length > 0) {
      this.logger.error('Add payment confirmations validation failed', errors);
      throw new BadRequestException(errors);
    }

    this.logger.debug('Request validation successful');
    return results.map((result) => ({ ...result.data, admin_id: admin_id }));
  }
}

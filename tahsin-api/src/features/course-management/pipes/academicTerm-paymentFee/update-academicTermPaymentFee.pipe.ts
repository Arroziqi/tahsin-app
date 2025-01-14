import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { UpdateAcademicTermPaymentFeeSchema } from '../../presentation/dto/academicTerm-paymentFee/update-academictermPaymentFee.dto';

@Injectable()
export class UpdateAcademicTermPaymentFeePipe implements PipeTransform {
  private readonly logger = new Logger(UpdateAcademicTermPaymentFeePipe.name);

  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting request validation');

    const result = UpdateAcademicTermPaymentFeeSchema.safeParse(value);

    if (!result.success) {
      this.logger.error('Request validation failed', result.error.errors);
      throw new BadRequestException(result.error.errors);
    }

    this.logger.debug('Request validation successful');
    return result.data;
  }
}

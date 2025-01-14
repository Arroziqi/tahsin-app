import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { AddAcademicTermPaymentFeeSchema } from '../../presentation/dto/academicTerm-paymentFee/add-AcademicTermPaymentFee.dto';

@Injectable()
export class AddAcademicTermPaymentFeePipe implements PipeTransform {
  private readonly logger = new Logger(AddAcademicTermPaymentFeePipe.name);

  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting request validation');
    const { user_id, ...data } = value;

    const result = AddAcademicTermPaymentFeeSchema.safeParse(data);

    if (!result.success) {
      this.logger.error('Request validation failed', result.error.errors);
      throw new BadRequestException(result.error.errors);
    }

    this.logger.debug('Request validation successful');
    return { ...result.data, admin_id: user_id };
  }
}

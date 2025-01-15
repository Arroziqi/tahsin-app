import {
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../../../user-management/guards/roles/roles.guard';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { DataState } from '../../../../core/resources/data.state';
import { AddPaymentConfirmationUsecase } from '../../domain/usecases/payment-confirmation/add-paymentConfirmation.usecase';
import { UpdatePaymentConfirmationUsecase } from '../../domain/usecases/payment-confirmation/update-paymentConfirmation.usecase';
import { DeletePaymentConfirmationUsecase } from '../../domain/usecases/payment-confirmation/delete-paymentConfirmation.usecase';
import { AddPaymentConfirmationPipe } from '../../pipes/payment-confirmation/add-paymentConfirmation.pipe';
import { UpdatePaymentConfirmationPipe } from '../../pipes/payment-confirmation/update-paymentConfirmation.pipe';
import { GetAllPaymentConfirmationUsecase } from '../../domain/usecases/payment-confirmation/getAll-paymentConfirmation.usecase';
import { UserBody } from 'src/common/decorators/user-body.decorator';
import { PaymentConfirmationEntity } from '../../domain/entities/payment-confirmation.entity';

@Controller('/api/payment-confirmations')
@UseGuards(RolesGuard)
@Roles(['Admin', 'Student'])
export class PaymentConfirmationController {
  private readonly logger = new Logger(PaymentConfirmationController.name);
  constructor(
    private readonly getAllPaymentConfirmationsUsecase: GetAllPaymentConfirmationUsecase,
    private readonly addPaymentConfirmationUsecase: AddPaymentConfirmationUsecase,
    private readonly updatePaymentConfirmationUsecase: UpdatePaymentConfirmationUsecase,
    private readonly deletePaymentConfirmationUsecase: DeletePaymentConfirmationUsecase,
  ) {}

  @Get()
  @Roles(['Admin'])
  async getPaymentConfirmations(): Promise<
    DataState<PaymentConfirmationEntity[]>
  > {
    try {
      this.logger.debug('Getting all payment confirmations');
      const result = await this.getAllPaymentConfirmationsUsecase.execute();

      this.logger.log('Successfully retrieved all payment confirmations');
      return result;
    } catch (error) {
      this.logger.error('Failed to get payment confirmations', {
        error: error.message,
      });
      throw error;
    }
  }

  @Post()
  async createPaymentConfirmation(
    @UserBody(AddPaymentConfirmationPipe) request: PaymentConfirmationEntity,
  ): Promise<DataState<PaymentConfirmationEntity>> {
    try {
      this.logger.debug('Creating payment confirmation', { request });
      const result = await this.addPaymentConfirmationUsecase.execute(request);

      this.logger.log('Successfully created payment confirmation');
      return result;
    } catch (error) {
      this.logger.error('Failed to create payment confirmation', {
        error: error.message,
      });
      throw error;
    }
  }

  @Patch(':id')
  async updatePaymentConfirmation(
    @Param('id', ParseIntPipe) id: number,
    @UserBody(UpdatePaymentConfirmationPipe) request: PaymentConfirmationEntity,
  ): Promise<DataState<PaymentConfirmationEntity>> {
    try {
      this.logger.debug('Updating payment confirmation', { id, request });
      const result = await this.updatePaymentConfirmationUsecase.execute({
        id,
        ...request,
      });

      this.logger.log('Successfully updated payment confirmation');
      return result;
    } catch (error) {
      this.logger.error('Failed to update payment confirmation', {
        error: error.message,
      });
      throw error;
    }
  }

  @Delete(':id')
  async deletePaymentConfirmation(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DataState<string>> {
    try {
      this.logger.debug('Deleting payment confirmation', { id });
      const result = await this.deletePaymentConfirmationUsecase.execute(id);

      this.logger.log('Successfully deleted payment confirmation');
      return result;
    } catch (error) {
      this.logger.error('Failed to delete payment confirmation', {
        error: error.message,
      });
      throw error;
    }
  }
}

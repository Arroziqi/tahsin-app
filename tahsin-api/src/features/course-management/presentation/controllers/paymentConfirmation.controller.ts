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
import { AdminBody } from '../../../../common/decorators/admin-body.decorator';
import { AddManyPaymentConfirmationPipe } from '../../pipes/payment-confirmation/addMany-paymentConfirmation.pipe';
import { AddManyPaymentConfirmationUsecase } from '../../domain/usecases/payment-confirmation/addMany-paymentConfirmation.usecase';
import { UpdateStatusPaymentConfirmationPipe } from '../../pipes/payment-confirmation/updateStatus-paymentConfirmation.pipe';
import { GetByStudentIdPaymentConfirmationUsecase } from '../../domain/usecases/payment-confirmation/getByStudentId-paymentConfirmation.usecase';

@Controller('/api/payment-confirmations')
@UseGuards(RolesGuard)
@Roles(['Admin', 'Student'])
export class PaymentConfirmationController {
  private readonly logger: Logger = new Logger(
    PaymentConfirmationController.name,
  );
  constructor(
    private readonly getAllPaymentConfirmationsUsecase: GetAllPaymentConfirmationUsecase,
    private readonly getByStudentIdPaymentConfirmationUsecase: GetByStudentIdPaymentConfirmationUsecase,
    private readonly addPaymentConfirmationUsecase: AddPaymentConfirmationUsecase,
    private readonly addManyPaymentConfirmationUsecase: AddManyPaymentConfirmationUsecase,
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

  @Get('/student/:studentId')
  @Roles(['Admin'])
  async getByStudentIdPaymentConfirmations(
    @Param('studentId', ParseIntPipe) studentId: number,
  ): Promise<DataState<PaymentConfirmationEntity[]>> {
    try {
      this.logger.debug('Getting payment confirmations');
      const result: DataState<PaymentConfirmationEntity[]> =
        await this.getByStudentIdPaymentConfirmationUsecase.execute(studentId);

      this.logger.log('Successfully retrieved payment confirmations');
      return result;
    } catch (error) {
      this.logger.error('Failed to get payment confirmations', {
        error: error.message,
      });
      throw error;
    }
  }

  // TODO: Fix this error
  @Get('/student')
  @Roles(['Student'])
  async getCurrentUserPaymentConfirmations(
    @UserBody() studentId: { user_id: number },
  ): Promise<DataState<PaymentConfirmationEntity[]>> {
    try {
      this.logger.debug('Getting payment confirmations');
      const result: DataState<PaymentConfirmationEntity[]> =
        await this.getByStudentIdPaymentConfirmationUsecase.execute(
          studentId.user_id,
        );

      this.logger.log('Successfully retrieved payment confirmations');
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
      const result: DataState<PaymentConfirmationEntity> =
        await this.addPaymentConfirmationUsecase.execute(request);

      this.logger.log('Successfully created payment confirmation');
      return result;
    } catch (error) {
      this.logger.error('Failed to create payment confirmation', {
        error: error.message,
      });
      throw error;
    }
  }

  @Post('/create-many')
  @UseGuards(RolesGuard)
  @Roles(['Admin'])
  async createManyPaymentConfirmations(
    @AdminBody(AddManyPaymentConfirmationPipe)
    registrations: PaymentConfirmationEntity[],
  ): Promise<DataState<PaymentConfirmationEntity[]>> {
    return await this.addManyPaymentConfirmationUsecase.execute(registrations);
  }

  @Patch(':id')
  async updatePaymentConfirmation(
    @Param('id', ParseIntPipe) id: number,
    @UserBody(UpdatePaymentConfirmationPipe) request: PaymentConfirmationEntity,
  ): Promise<DataState<PaymentConfirmationEntity>> {
    console.log({ id, request });
    throw new Error('1asasa');
    try {
      this.logger.debug('Updating payment confirmation', { id, request });
      const result: DataState<PaymentConfirmationEntity> =
        await this.updatePaymentConfirmationUsecase.execute({
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

  @Patch('/update-status/:id')
  @UseGuards(RolesGuard)
  @Roles(['Admin'])
  async updateStatusPaymentConfirmation(
    @Param('id', ParseIntPipe) id: number,
    @AdminBody(UpdateStatusPaymentConfirmationPipe)
    request: PaymentConfirmationEntity,
  ): Promise<DataState<PaymentConfirmationEntity>> {
    try {
      this.logger.debug('Updating status payment confirmation', {
        id,
        request,
      });
      const result: DataState<PaymentConfirmationEntity> =
        await this.updatePaymentConfirmationUsecase.execute({
          id,
          ...request,
        });

      this.logger.log('Successfully updated status payment confirmation');
      return result;
    } catch (error) {
      this.logger.error('Failed to update status payment confirmation', {
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
      const result: DataState<string> =
        await this.deletePaymentConfirmationUsecase.execute(id);

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

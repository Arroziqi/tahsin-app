import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import {
  DataFailed,
  DataState,
  DataSuccess,
} from '../../../../core/resources/data.state';
import { ErrorEntity } from '../../../../core/domain/entities/error.entity';
import { PrismaService } from '../../../../common/services/prisma.service';
import { UpdatePaymentConfirmationDto } from '../../presentation/dto/payment-confirmation/update-paymentConfirmation.dto';
import { PaymentConfirmationModel } from '../models/payment-confirmation.model';
import { AddPaymentConfirmationDto } from '../../presentation/dto/payment-confirmation/add-paymentConfirmation.dto';

export interface PaymentConfirmationPrismaDatasources {
  findAll(): Promise<DataState<PaymentConfirmationModel[]>>;
  findById(id: number): Promise<DataState<PaymentConfirmationModel>>;
  findByTransactionNumber(
    transaction_number: string,
  ): Promise<DataState<PaymentConfirmationModel>>;
  findByStudentId(
    student_id: number,
  ): Promise<DataState<PaymentConfirmationModel[]>>;
  create(
    paymentConfirmation: Required<AddPaymentConfirmationDto>,
  ): Promise<DataState<PaymentConfirmationModel>>;
  update(
    paymentConfirmation: UpdatePaymentConfirmationDto & { id: number },
  ): Promise<DataState<PaymentConfirmationModel>>;
  delete(id: number): Promise<DataState<string>>;
}

@Injectable()
export class PaymentConfirmationPrismaDatasourcesImpl
  implements PaymentConfirmationPrismaDatasources
{
  private readonly logger = new Logger(
    PaymentConfirmationPrismaDatasourcesImpl.name,
  );
  constructor(private readonly prismaService: PrismaService) {}

  async findByTransactionNumber(
    transaction_number: string,
  ): Promise<DataState<PaymentConfirmationModel>> {
    try {
      this.logger.log(
        `Finding payment confirmation for transaction number: ${transaction_number}`,
      );
      const data = await this.prismaService.paymentConfirmation.findFirst({
        where: { transaction_number },
      });

      if (!data) {
        this.logger.warn(
          `Payment confirmation not found for transaction number: ${transaction_number}`,
        );
        return new DataFailed(
          new ErrorEntity(404, 'Payment confirmation not found'),
        );
      }

      this.logger.log(
        `Successfully found payment confirmation for transaction number: ${transaction_number}`,
      );
      return new DataSuccess(data);
    } catch (error) {
      this.logger.error(
        `Error finding payment confirmation for transaction number: ${transaction_number}`,
      );
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findByStudentId(
    student_id: number,
  ): Promise<DataState<PaymentConfirmationModel[]>> {
    try {
      this.logger.log(
        `Finding payment confirmations for student id: ${student_id}`,
      );
      const data = await this.prismaService.paymentConfirmation.findMany({
        where: { student_id },
      });

      if (!data || data.length === 0) {
        this.logger.warn(
          `No payment confirmations found for student id: ${student_id}`,
        );
        return new DataFailed(
          new ErrorEntity(404, 'Payment confirmations not found'),
        );
      }

      this.logger.log(
        `Successfully found payment confirmations for student id: ${student_id}`,
      );
      return new DataSuccess(data);
    } catch (error) {
      this.logger.error(
        `Error finding payment confirmations for student id: ${student_id}`,
      );
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findAll(): Promise<DataState<PaymentConfirmationModel[]>> {
    try {
      this.logger.log(`Finding all payment confirmations`);
      const data = await this.prismaService.paymentConfirmation.findMany({
        orderBy: {
          id: 'asc',
        },
      });

      if (!data || data.length === 0) {
        this.logger.warn(`No payment confirmations found`);
        return new DataFailed(
          new ErrorEntity(404, 'Payment confirmations not found'),
        );
      }

      this.logger.log(`Successfully found all payment confirmations`);
      return new DataSuccess(data);
    } catch (error) {
      this.logger.error(`Error finding payment confirmations`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findById(id: number): Promise<DataState<PaymentConfirmationModel>> {
    try {
      this.logger.log(`Finding payment confirmation by id`);
      const data = await this.prismaService.paymentConfirmation.findFirst({
        where: { id },
      });

      if (!data) {
        this.logger.warn(`Payment confirmation by id not found`);
        return new DataFailed(
          new ErrorEntity(404, 'Payment confirmation not found'),
        );
      }

      this.logger.log(`Successfully found payment confirmation by id`);
      return new DataSuccess(data);
    } catch (error) {
      this.logger.error(`Error finding payment confirmation by id`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async create(
    paymentConfirmation: Required<AddPaymentConfirmationDto>,
  ): Promise<DataState<PaymentConfirmationModel>> {
    try {
      this.logger.log(`Creating payment confirmation`);
      const data = await this.prismaService.paymentConfirmation.create({
        data: paymentConfirmation,
      });

      this.logger.log(`Successfully created payment confirmation`);
      return new DataSuccess(data);
    } catch (error) {
      this.logger.error(`Error creating payment confirmation`);
      if (error.code === 'P2003') {
        throw new ErrorEntity(
          HttpStatus.BAD_REQUEST,
          `${error.meta.field_name} not found in the database. Please ensure the provided data is valid.`,
        );
      }
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async update(
    paymentConfirmation: UpdatePaymentConfirmationDto & { id: number },
  ): Promise<DataState<PaymentConfirmationModel>> {
    try {
      this.logger.log(`Updating payment confirmation`);
      const data = await this.prismaService.paymentConfirmation.update({
        where: { id: paymentConfirmation.id },
        data: paymentConfirmation,
      });

      this.logger.log(`Successfully updated payment confirmation`);
      return new DataSuccess(data);
    } catch (error) {
      this.logger.error(`Error updating payment confirmation`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async delete(id: number): Promise<DataState<string>> {
    try {
      this.logger.log(`Deleting payment confirmation`);
      await this.prismaService.paymentConfirmation.delete({
        where: { id },
      });

      this.logger.log(`Successfully deleted payment confirmation`);
      return new DataSuccess('OK');
    } catch (error) {
      this.logger.error(`Error deleting payment confirmation`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
}

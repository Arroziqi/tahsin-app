import { Module } from '@nestjs/common';
import { PaymentConfirmationPrismaDatasourcesImpl } from '../data/datasources/payment-confirmation.prisma.datasources';
import { PaymentConfirmationService } from '../domain/services/payment-confirmation.service';
import { PaymentConfirmationController } from '../presentation/controllers/paymentConfirmation.controller';
import { DeletePaymentConfirmationUsecase } from '../domain/usecases/payment-confirmation/delete-paymentConfirmation.usecase';
import { GetAllPaymentConfirmationUsecase } from '../domain/usecases/payment-confirmation/getAll-paymentConfirmation.usecase';
import { AddPaymentConfirmationUsecase } from '../domain/usecases/payment-confirmation/add-paymentConfirmation.usecase';
import { UpdatePaymentConfirmationUsecase } from '../domain/usecases/payment-confirmation/update-paymentConfirmation.usecase';
import { PAYMENT_CONFIRMATION_REPO_TOKEN } from '../../../core/const/provider.token';
import { AddManyPaymentConfirmationUsecase } from '../domain/usecases/payment-confirmation/addMany-paymentConfirmation.usecase';
import { GetByStudentIdPaymentConfirmationUsecase } from '../domain/usecases/payment-confirmation/getByStudentId-paymentConfirmation.usecase';

@Module({
  controllers: [PaymentConfirmationController],
  providers: [
    PaymentConfirmationService,
    GetAllPaymentConfirmationUsecase,
    GetByStudentIdPaymentConfirmationUsecase,
    AddPaymentConfirmationUsecase,
    AddManyPaymentConfirmationUsecase,
    UpdatePaymentConfirmationUsecase,
    DeletePaymentConfirmationUsecase,
    {
      provide: PAYMENT_CONFIRMATION_REPO_TOKEN,
      useClass: PaymentConfirmationPrismaDatasourcesImpl,
    },
  ],
  exports: [AddPaymentConfirmationUsecase],
})
export class PaymentConfirmationModule {}

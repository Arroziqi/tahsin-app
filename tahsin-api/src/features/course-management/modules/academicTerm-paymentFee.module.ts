import { Module } from '@nestjs/common';
import { AcademicTermPaymentFeePrismaDatasourcesImpl } from '../data/datasources/academicTerm-paymentFee.prisma.datasources';
import { AcademicTermPaymentFeeService } from '../domain/services/academicTerm-paymentFee.service';
import { AcademicTermPaymentFeeController } from '../presentation/controllers/academicTermPaymentFee.controller';
import { DeleteAcademicTermPaymentFeeUsecase } from '../domain/usecases/academicTerm-paymentFee/delete-class.usecase';
import { GetAllAcademicTermPaymentFeeUsecase } from '../domain/usecases/academicTerm-paymentFee/getAll-class.usecase';
import { AddAcademicTermPaymentFeeUsecase } from '../domain/usecases/academicTerm-paymentFee/add-class.usecase';
import { UpdateAcademicTermPaymentFeeUsecase } from '../domain/usecases/academicTerm-paymentFee/update-class.usecase';
import { ACADEMIC_TERM_PAYMENT_FEE_REPO_TOKEN } from '../../../core/const/provider.token';

@Module({
  controllers: [AcademicTermPaymentFeeController],
  providers: [
    AcademicTermPaymentFeeService,
    GetAllAcademicTermPaymentFeeUsecase,
    AddAcademicTermPaymentFeeUsecase,
    UpdateAcademicTermPaymentFeeUsecase,
    DeleteAcademicTermPaymentFeeUsecase,
    {
      provide: ACADEMIC_TERM_PAYMENT_FEE_REPO_TOKEN,
      useClass: AcademicTermPaymentFeePrismaDatasourcesImpl,
    },
  ],
  exports: [AcademicTermPaymentFeeService],
})
export class AcademicTermPaymentFeeModule {}

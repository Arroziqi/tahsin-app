import { Module } from '@nestjs/common';
import { AcademicTermModule } from './modules/academic-term.module';
import { AcademicCalenderModule } from './modules/academic-calender.module';
import { ClassModule } from './modules/class.module';
import { AcademicTermPaymentFeeModule } from './modules/academicTerm-paymentFee.module';
import { RegistrationModule } from './modules/registration.module';
import { PaymentConfirmationModule } from './modules/payment-confirmation.module';

@Module({
  imports: [
    AcademicTermModule,
    AcademicCalenderModule,
    ClassModule,
    AcademicTermPaymentFeeModule,
    RegistrationModule,
    PaymentConfirmationModule,
  ],
  controllers: [],
})
export class CourseManagementModule {}

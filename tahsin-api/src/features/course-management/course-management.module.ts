import { Module } from '@nestjs/common';
import { AcademicTermModule } from './modules/academic-term.module';
import { AcademicCalenderModule } from './modules/academic-calender.module';
import { ClassModule } from './modules/class.module';
import { AcademicTermPaymentFeeModule } from './modules/academicTerm-paymentFee.module';

@Module({
  imports: [
    AcademicTermModule,
    AcademicCalenderModule,
    ClassModule,
    AcademicTermPaymentFeeModule,
  ],
  controllers: [],
})
export class CourseManagementModule {}

import { Module } from '@nestjs/common';
import { AcademicTermModule } from './modules/academic-term.module';
import { AcademicCalenderModule } from './modules/academic-calender.module';

@Module({
  imports: [AcademicTermModule, AcademicCalenderModule],
  controllers: [],
})
export class CourseManagementModule {}

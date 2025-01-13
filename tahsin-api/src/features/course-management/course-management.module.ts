import { Module } from '@nestjs/common';
import { AcademicTermModule } from './modules/academic-term.module';
import { AcademicCalenderModule } from './modules/academic-calender.module';
import { ClassModule } from './modules/class.module';

@Module({
  imports: [AcademicTermModule, AcademicCalenderModule, ClassModule],
  controllers: [],
})
export class CourseManagementModule {}

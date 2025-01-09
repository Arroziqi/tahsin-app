import { Module } from '@nestjs/common';
import { AcademicTermModule } from './modules/academic-term.module';

@Module({
  imports: [AcademicTermModule],
})
export class CourseManagementModule {}

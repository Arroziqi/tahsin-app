import { Module } from '@nestjs/common';
import { ACADEMIC_CALENDER_REPO_TOKEN } from '../../../core/const/provider.token';
import { AcademicCalenderPrismaDatasourcesImpl } from '../data/datasources/academic-calender.prisma.datasources';
import { GetAllAcademicCalenderUsecase } from '../domain/usecases/academic-calender/getAll-academicCalender.usecase';
import { AddAcademicCalenderUsecase } from '../domain/usecases/academic-calender/add-academicCalender.usecase';
import { UpdateAcademicCalenderUsecase } from '../domain/usecases/academic-calender/update-academicCalender.usecase';
import { DeleteAcademicCalenderUsecase } from '../domain/usecases/academic-calender/delete-academicCalender.usecase';
import { AcademicCalenderService } from '../domain/services/academic-calender.service';
import { AcademicCalenderController } from '../presentation/controllers/academicCalender.controller';

@Module({
  controllers: [AcademicCalenderController],
  providers: [
    AcademicCalenderService,
    GetAllAcademicCalenderUsecase,
    AddAcademicCalenderUsecase,
    UpdateAcademicCalenderUsecase,
    DeleteAcademicCalenderUsecase,
    {
      provide: ACADEMIC_CALENDER_REPO_TOKEN,
      useClass: AcademicCalenderPrismaDatasourcesImpl,
    },
  ],
})
export class AcademicCalenderModule {}

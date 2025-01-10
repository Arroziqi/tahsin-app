import { Module } from '@nestjs/common';
import { ACADEMIC_TERMS_REPO_TOKEN } from '../../../core/const/provider.token';
import { AcademicTermPrismaDatasourcesImpl } from '../data/datasources/academic-term.prisma.datasources';
import { GetAllAcademicTermUsecase } from '../domain/usecases/academic-term/getAll-academicTerm.usecase';
import { AddAcademicTermUsecase } from '../domain/usecases/academic-term/add-academicTerm.usecase';
import { UpdateAcademicTermUsecase } from '../domain/usecases/academic-term/update-academicTerm.usecase';
import { DeleteAcademicTermUsecase } from '../domain/usecases/academic-term/delete-academicTerm.usecase';
import { AcademicTermService } from '../domain/services/academic-term.service';
import { AcademicTermController } from '../presentation/controllers/academicTerm.controller';

@Module({
  controllers: [AcademicTermController],
  providers: [
    AcademicTermService,
    GetAllAcademicTermUsecase,
    AddAcademicTermUsecase,
    UpdateAcademicTermUsecase,
    DeleteAcademicTermUsecase,
    {
      provide: ACADEMIC_TERMS_REPO_TOKEN,
      useClass: AcademicTermPrismaDatasourcesImpl,
    },
  ],
})
export class AcademicTermModule {}

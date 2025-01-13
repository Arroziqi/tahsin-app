import { Module } from '@nestjs/common';
import { CLASS_REPO_TOKEN } from '../../../core/const/provider.token';
import { ClassPrismaDatasourcesImpl } from '../data/datasources/class.prisma.datasources';
import { GetAllClassUsecase } from '../domain/usecases/class/getAll-class.usecase';
import { AddClassUsecase } from '../domain/usecases/class/add-class.usecase';
import { UpdateClassUsecase } from '../domain/usecases/class/update-class.usecase';
import { DeleteClassUsecase } from '../domain/usecases/class/delete-class.usecase';
import { ClassService } from '../domain/services/class.service';
import { ClassController } from '../presentation/controllers/class.controller';

@Module({
  controllers: [ClassController],
  providers: [
    ClassService,
    GetAllClassUsecase,
    AddClassUsecase,
    UpdateClassUsecase,
    DeleteClassUsecase,
    {
      provide: CLASS_REPO_TOKEN,
      useClass: ClassPrismaDatasourcesImpl,
    },
  ],
})
export class ClassModule {}

import { Module } from '@nestjs/common';
import { RegistrationPrismaDatasourcesImpl } from '../data/datasources/registration.prisma.datasources';
import { RegistrationService } from '../domain/services/registration.service';
import { RegistrationController } from '../presentation/controllers/registration.controller';
import { DeleteRegistrationUsecase } from '../domain/usecases/registration/delete-registration.usecase';
import { GetAllRegistrationUsecase } from '../domain/usecases/registration/getAll-registration.usecase';
import { AddRegistrationUsecase } from '../domain/usecases/registration/add-registration.usecase';
import { UpdateRegistrationUsecase } from '../domain/usecases/registration/update-registration.usecase';
import { REGISTRATION_REPO_TOKEN } from '../../../core/const/provider.token';
import { AddManyRegistrationUsecase } from '../domain/usecases/registration/addMany-registration.usecase';
import { UpdateLevelRegistrationUsecase } from '../domain/usecases/registration/updateLevel-registration.usecase';

@Module({
  controllers: [RegistrationController],
  providers: [
    RegistrationService,
    GetAllRegistrationUsecase,
    AddRegistrationUsecase,
    AddManyRegistrationUsecase,
    UpdateRegistrationUsecase,
    UpdateLevelRegistrationUsecase,
    DeleteRegistrationUsecase,
    {
      provide: REGISTRATION_REPO_TOKEN,
      useClass: RegistrationPrismaDatasourcesImpl,
    },
  ],
})
export class RegistrationModule {}

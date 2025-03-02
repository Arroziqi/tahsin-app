import { Global, Module } from '@nestjs/common';
import { RoleController } from '../presentation/controllers/role/role.controller';
import { ProfileController } from '../presentation/controllers/profile/profile.controller';
import { CreateRoleUsecase } from '../domain/usecases/role/create.usecase';
import { GetAllRoleUsecase } from '../domain/usecases/role/get.all.usecase';
import { UpdateRoleUsecase } from '../domain/usecases/role/update.usecase';
import { DeleteRoleUsecase } from '../domain/usecases/role/delete.usecase';
import { GetProfileUsecase } from '../domain/usecases/profile/get.usecase';
import { GetAllProfileUsecase } from '../domain/usecases/profile/get.all.usecase';
import { CreateProfileUsecase } from '../domain/usecases/profile/create.usecase';
import { CreateManyProfileUsecase } from '../domain/usecases/profile/createMany-profile.usecase';
import { UpdateProfileUsecase } from '../domain/usecases/profile/update.usecase';
import { AddStudentUseCase } from '../domain/usecases/student/addStudent.usecase';
import { ProfileService } from '../domain/services/profile.service';
import { StudentService } from '../domain/services/student.service';
import {
  PROFILE_REPO_TOKEN,
  ROLE_REPO_TOKEN,
  STUDENT_REPO_TOKEN,
} from '../../../core/const/provider.token';
import { RolePrismaDataSourcesImpl } from '../data/datasources/local/role.prisma.datasources';
import { ProfileDatasourcesImpl } from '../data/datasources/local/profile.datasources';
import { StudentPrismaDatasourcesImpl } from '../data/datasources/local/student.prisma.datasources';

@Global()
@Module({
  controllers: [RoleController, ProfileController],
  providers: [
    CreateRoleUsecase,
    GetAllRoleUsecase,
    UpdateRoleUsecase,
    DeleteRoleUsecase,
    GetProfileUsecase,
    GetAllProfileUsecase,
    CreateProfileUsecase,
    CreateManyProfileUsecase,
    UpdateProfileUsecase,
    AddStudentUseCase,
    ProfileService,
    StudentService,
    {
      provide: ROLE_REPO_TOKEN,
      useClass: RolePrismaDataSourcesImpl,
    },
    {
      provide: PROFILE_REPO_TOKEN,
      useClass: ProfileDatasourcesImpl,
    },
    {
      provide: STUDENT_REPO_TOKEN,
      useClass: StudentPrismaDatasourcesImpl,
    },
  ],
  exports: [AddStudentUseCase, StudentService],
})
export class UserModule {}

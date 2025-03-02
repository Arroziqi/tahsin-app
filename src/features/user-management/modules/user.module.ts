import { Global, Module } from "@nestjs/common";
import { RoleController } from "../presentation/controllers/role/role.controller";
import { ProfileController } from "../presentation/controllers/profile/profile.controller";
import { UpdateUserRoleUsecase } from "../domain/usecases/auth/update-role.usecase";
import { CreateRoleUsecase } from "../domain/usecases/role/create.usecase";
import { GetAllRoleUsecase } from "../domain/usecases/role/get.all.usecase";
import { UpdateRoleUsecase } from "../domain/usecases/role/update.usecase";
import { DeleteRoleUsecase } from "../domain/usecases/role/delete.usecase";
import { GetProfileUsecase } from "../domain/usecases/profile/get.usecase";
import { GetAllProfileUsecase } from "../domain/usecases/profile/get.all.usecase";
import { CreateProfileUsecase } from "../domain/usecases/profile/create.usecase";
import { CreateManyProfileUsecase } from "../domain/usecases/profile/createMany-profile.usecase";
import { UpdateProfileUsecase } from "../domain/usecases/profile/update.usecase";
import { AddStudentUseCase } from "../domain/usecases/student/addStudent.usecase";
import { ProfileService } from "../domain/services/profile.service";
import { StudentService } from "../domain/services/student.service";
import {
	PROFILE_REPO_TOKEN,
	ROLE_REPO_TOKEN,
	STUDENT_REPO_TOKEN,
	USER_REPO_TOKEN,
} from "../../../core/const/provider.token";
import { RolePrismaDataSourcesImpl } from "../data/datasources/local/role.prisma.datasources";
import { ProfileDatasourcesImpl } from "../data/datasources/local/profile.datasources";
import { StudentPrismaDatasourcesImpl } from "../data/datasources/local/student.prisma.datasources";
import { PrismaDataSourcesImpl } from "../data/datasources/local/prisma.datasources";
import { StudentRepository } from "../domain/repository/student.repository";
import { StudentRepositoryImpl } from "../data/repository/student.repository.impl";

@Global()
@Module({
	controllers: [RoleController, ProfileController],
	providers: [
		UpdateUserRoleUsecase,
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
		{
			provide: StudentRepository,
			useClass: StudentRepositoryImpl,
		},
		{
			provide: USER_REPO_TOKEN,
			useClass: PrismaDataSourcesImpl,
		},
	],
	exports: [
		UpdateUserRoleUsecase,
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
		{
			provide: StudentRepository,
			useClass: StudentRepositoryImpl,
		},
		{
			provide: USER_REPO_TOKEN,
			useClass: PrismaDataSourcesImpl,
		},
	],
})
export class UserModule {}

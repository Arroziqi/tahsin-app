import { Inject, Injectable } from "@nestjs/common";
import { StudentRepository } from "../../domain/repository/student.repository";
import { DataState } from "src/core/resources/data.state";
import { StudentEntity } from "../../domain/entities/student.entity";
import { STUDENT_REPO_TOKEN } from "../../../../core/const/provider.token";
import { StudentPrismaDatasources } from "../datasources/local/student.prisma.datasources";

@Injectable()
export class StudentRepositoryImpl implements StudentRepository {
	constructor(
		@Inject(STUDENT_REPO_TOKEN)
		private readonly studentDatasource: StudentPrismaDatasources
	) {}
	async create(student: StudentEntity): Promise<DataState<StudentEntity>> {
		return await this.studentDatasource.create(student);
	}
	async update(student: StudentEntity): Promise<DataState<StudentEntity>> {
		return await this.studentDatasource.update(student);
	}
	async delete(id: number): Promise<DataState<string>> {
		return await this.studentDatasource.delete(id);
	}
	async findById(id: number): Promise<DataState<StudentEntity>> {
		return await this.studentDatasource.findById(id);
	}
	async findAll(): Promise<DataState<StudentEntity[]>> {
		return await this.studentDatasource.findAll();
	}
	async findByRegistrationId(
		registrationId: number
	): Promise<DataState<StudentEntity>> {
		return await this.studentDatasource.findByRegistrationId(registrationId);
	}
	async findByUserId(userId: number): Promise<DataState<StudentEntity>> {
		return await this.studentDatasource.findByUserId(userId);
	}
}

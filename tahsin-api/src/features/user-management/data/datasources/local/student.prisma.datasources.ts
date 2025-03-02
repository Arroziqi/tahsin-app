import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { StudentEntity } from '../../../domain/entities/student.entity';
import {
  DataFailed,
  DataState,
  DataSuccess,
} from '../../../../../core/resources/data.state';
import { AddStudentDto } from '../../dto/student/addStudent.dto';
import { ErrorEntity } from '../../../../../core/domain/entities/error.entity';
import { PrismaService } from '../../../../../common/services/prisma.service';
import { UpdateStudentDto } from '../../dto/student/updateStudent.dto';
import { StudentModel } from '../../models/student.model';

export interface StudentPrismaDatasources {
  create(student: AddStudentDto): Promise<DataState<StudentEntity>>;
  update(student: UpdateStudentDto): Promise<DataState<StudentEntity>>;
  delete(id: number): Promise<DataState<string>>;
  findById(id: number): Promise<DataState<StudentEntity>>;
  findAll(): Promise<DataState<StudentEntity[]>>;
  findByRegistrationId(
    registration_id: number,
  ): Promise<DataState<StudentEntity>>;
  findByUserId(user_id: number): Promise<DataState<StudentEntity>>;
}

@Injectable()
export class StudentPrismaDatasourcesImpl implements StudentPrismaDatasources {
  private readonly logger: Logger = new Logger(
    StudentPrismaDatasourcesImpl.name,
  );
  constructor(private readonly prismaService: PrismaService) {}
  async create(student: AddStudentDto): Promise<DataState<StudentEntity>> {
    try {
      this.logger.log(`creating new student`);
      const data = await this.prismaService.student.create({
        data: student,
      });

      this.logger.log(`Successfully created student`);
      return new DataSuccess(data);
    } catch (error) {
      this.logger.error(`Error creating student`);
      if (error.code === 'P2003') {
        throw new ErrorEntity(
          HttpStatus.BAD_REQUEST,
          `${error.meta.field_name} not found in the database. Please ensure the provided data is valid.`,
        );
      }
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
  async update(student: UpdateStudentDto): Promise<DataState<StudentEntity>> {
    try {
      this.logger.log(`Updating student`);
      const data = await this.prismaService.student.update({
        where: { id: student.id },
        data: student,
        include: {
          User: true,
          Level: true,
          Registration: true,
          PaymentConfirmation: true,
        },
      });

      this.logger.log(`Successfully updated student`);
      return new DataSuccess(data);
    } catch (error) {
      this.logger.error(`Error updating student`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
  async delete(id: number): Promise<DataState<string>> {
    try {
      this.logger.log(`Deleting student`);
      await this.prismaService.student.delete({
        where: { id },
      });

      this.logger.log(`Successfully deleted student`);
      return new DataSuccess('OK');
    } catch (error) {
      this.logger.error(`Error deleting student`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
  async findById(id: number): Promise<DataState<StudentEntity>> {
    try {
      this.logger.log(`Finding student by id`);
      const data: StudentModel = await this.prismaService.student.findFirst({
        where: { id },
      });

      if (!data) {
        this.logger.warn(`student not found`);
        return new DataFailed(new ErrorEntity(404, 'student not found'));
      }

      this.logger.log(`Successfully found student by id`);
      return new DataSuccess(data);
    } catch (error) {
      this.logger.error(`Error finding student by id`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
  async findAll(): Promise<DataState<StudentEntity[]>> {
    try {
      this.logger.log(`Finding all students`);
      const data: StudentModel[] = await this.prismaService.student.findMany({
        orderBy: {
          id: 'asc',
        },
      });

      if (!data || data.length === 0) {
        this.logger.warn(`No students found`);
        return new DataFailed(new ErrorEntity(404, 'students not found'));
      }

      this.logger.log(`Successfully found all students`);
      return new DataSuccess(data);
    } catch (error) {
      this.logger.error(`Error finding students`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
  async findByRegistrationId(
    registration_id: number,
  ): Promise<DataState<StudentEntity>> {
    try {
      this.logger.log(`Finding student by registration id`);
      const data: StudentModel = await this.prismaService.student.findFirst({
        where: { registration_id },
      });

      if (!data) {
        this.logger.warn(`student not found`);
        return new DataFailed(new ErrorEntity(404, 'student not found'));
      }

      this.logger.log(`Successfully found student by registration id`);
      return new DataSuccess(data);
    } catch (error) {
      this.logger.error(`Error finding student by registration id`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
  async findByUserId(user_id: number): Promise<DataState<StudentEntity>> {
    try {
      this.logger.log(`Finding student by user id`);
      const data: StudentModel = await this.prismaService.student.findFirst({
        where: { user_id },
      });

      if (!data) {
        this.logger.warn(`student not found`);
        return new DataFailed(new ErrorEntity(404, 'student not found'));
      }

      this.logger.log(`Successfully found student by user id`);
      return new DataSuccess(data);
    } catch (error) {
      this.logger.error(`Error finding student by user id`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
}

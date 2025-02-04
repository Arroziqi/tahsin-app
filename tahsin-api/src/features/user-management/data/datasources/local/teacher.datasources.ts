import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { ErrorEntity } from 'src/core/domain/entities/error.entity';
import { DataState } from 'src/core/resources/data.state';
import { TeacherModel } from '../../models/teacher.model';

export interface TeacherDatasources {
  create(teacher: TeacherModel): Promise<DataState<TeacherModel>>;

  findById(id: number): Promise<DataState<TeacherModel>>;

  findByUserId(userId: number): Promise<DataState<TeacherModel>>;

  findAll(): Promise<DataState<TeacherModel[]>>;

  update(teacher: Partial<TeacherModel>): Promise<DataState<TeacherModel>>;
}

@Injectable()
export class TeacherDatasourcesImpl implements TeacherDatasources {
  private readonly logger = new Logger(TeacherDatasourcesImpl.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(teacher: TeacherModel): Promise<DataState<TeacherModel>> {
    const { User, Class, id, ...teacherData } = teacher;
    try {
      this.logger.log(`Creating teacher`);
      const data = await this.prismaService.teacher.create({
        data: teacherData,
      });
      this.logger.log(`Teacher created successfully`);
      return {
        data: new TeacherModel(data),
        error: undefined,
      };
    } catch (error) {
      this.logger.error(`Error creating teacher: ${error}`);
      return { data: undefined, error: error };
    }
  }

  async findById(id: number): Promise<DataState<TeacherModel>> {
    try {
      this.logger.log(`Finding teacher by id: ${id}`);
      const data = await this.prismaService.teacher.findUnique({
        where: { id },
        include: {
          User: true,
        },
      });

      if (!data) {
        this.logger.log('Teacher not found');
        return {
          data: undefined,
          error: new ErrorEntity(404, 'Teacher not found'),
        };
      }

      this.logger.log(`Teacher found: ${JSON.stringify(data)}`);
      return {
        data: new TeacherModel({
          ...data,
          User: true ? data.User : undefined,
        }),
        error: undefined,
      };
    } catch (error) {
      this.logger.error(`Error finding teacher: ${error}`);
      return { data: undefined, error: error };
    }
  }

  async findByUserId(userId: number): Promise<DataState<TeacherModel>> {
    try {
      this.logger.log(`Finding teacher by user id: ${userId}`);
      const data = await this.prismaService.teacher.findUnique({
        where: { user_id: userId },
        include: { User: true },
      });

      if (!data) {
        this.logger.log('Teacher not found');
        return {
          data: undefined,
          error: new ErrorEntity(404, 'Teacher not found'),
        };
      }

      this.logger.log(`Teacher found for user id: ${userId}`);
      return {
        data: new TeacherModel({
          ...data,
          User: true ? data.User : undefined,
        }),
        error: undefined,
      };
    } catch (error) {
      this.logger.error(`Error finding teacher by user id: ${error}`);
      return { data: undefined, error: error };
    }
  }

  async findAll(): Promise<DataState<TeacherModel[]>> {
    try {
      this.logger.log('Finding all teachers');
      const data = await this.prismaService.teacher.findMany({
        include: {
          User: true,
        },
      });
      this.logger.log(`Found teachers: ${JSON.stringify(data)}`);
      return {
        data: data.map(
          (teacher) =>
            new TeacherModel({
              ...teacher,
              User: true ? teacher.User : undefined,
            }),
        ),
        error: undefined,
      };
    } catch (error) {
      this.logger.error(`Error finding all teachers: ${error}`);
      return { data: undefined, error: error };
    }
  }

  async update(
    teacher: Partial<TeacherModel>,
  ): Promise<DataState<TeacherModel>> {
    try {
      this.logger.log(`Updating teacher: ${JSON.stringify(teacher)}`);
      const { User, Class, id, ...teacherData } = teacher;
      const data = await this.prismaService.teacher.update({
        where: { id: teacher.id },
        data: teacherData,
      });
      this.logger.log(`Teacher updated successfully for user id: `);
      return {
        data: new TeacherModel(data),
        error: undefined,
      };
    } catch (error) {
      this.logger.error(`Error updating teacher: ${error}`);
      return { data: undefined, error: error };
    }
  }
}

import { Injectable, Logger } from '@nestjs/common';
import {
  DataFailed,
  DataState,
  DataSuccess,
} from '../../../../core/resources/data.state';
import { ClassModel } from '../models/class.model';
import { ErrorEntity } from '../../../../core/domain/entities/error.entity';
import { PrismaService } from '../../../../common/services/prisma.service';
import { ClassEntity } from '../../domain/entities/class.entity';

export interface ClassPrismaDatasources {
  findAll(): Promise<DataState<ClassModel[]>>;
  findById(id: number): Promise<DataState<ClassModel>>;
  findByTeacherId(teacher_id: number): Promise<DataState<ClassModel[]>>;
  findByLevelId(level_id: number): Promise<DataState<ClassModel[]>>;
  findByName(name: string): Promise<DataState<ClassModel>>;
  create(classData: ClassEntity): Promise<DataState<ClassModel>>;
  update(classData: ClassEntity): Promise<DataState<ClassModel>>;
  delete(id: number): Promise<DataState<string>>;
}

@Injectable()
export class ClassPrismaDatasourcesImpl implements ClassPrismaDatasources {
  private readonly logger = new Logger(ClassPrismaDatasourcesImpl.name);
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<DataState<ClassModel[]>> {
    try {
      this.logger.log('Finding all classes');
      const data = await this.prismaService.class.findMany({
        orderBy: {
          id: 'asc',
        },
        include: {
          Level: true,
          Teacher: true,
        },
      });

      if (!data || data.length === 0) {
        this.logger.warn('Classes not found');
        return new DataFailed(new ErrorEntity(404, 'Classes not found'));
      }

      this.logger.log('Successfully found classes');
      return new DataSuccess(data.map((item) => new ClassModel(item)));
    } catch (error) {
      this.logger.error('Error finding classes');
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findById(id: number): Promise<DataState<ClassModel>> {
    try {
      this.logger.log('Finding class by id');
      const data = await this.prismaService.class.findFirst({
        where: { id },
        include: {
          Level: true,
          Teacher: true,
        },
      });

      if (!data) {
        this.logger.warn('Class not found');
        return new DataFailed(new ErrorEntity(404, 'Class not found'));
      }

      this.logger.log('Successfully found class');
      return new DataSuccess(new ClassModel(data));
    } catch (error) {
      this.logger.error('Error finding class');
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findByTeacherId(teacher_id: number): Promise<DataState<ClassModel[]>> {
    try {
      this.logger.log('Finding classes by user id');
      const data = await this.prismaService.class.findMany({
        where: { teacher_id },
        include: {
          Level: true,
          Teacher: true,
        },
      });

      if (!data || data.length === 0) {
        this.logger.warn('Classes not found');
        return new DataFailed(new ErrorEntity(404, 'Classes not found'));
      }

      this.logger.log('Successfully found classes');
      return new DataSuccess(data.map((item) => new ClassModel(item)));
    } catch (error) {
      this.logger.error('Error finding classes');
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findByLevelId(level_id: number): Promise<DataState<ClassModel[]>> {
    try {
      this.logger.log('Finding classes by level id');
      const data = await this.prismaService.class.findMany({
        where: { level_id },
        include: {
          Level: true,
          Teacher: true,
        },
      });

      if (!data || data.length === 0) {
        this.logger.warn('Classes not found');
        return new DataFailed(new ErrorEntity(404, 'Classes not found'));
      }

      this.logger.log('Successfully found classes');
      return new DataSuccess(data.map((item) => new ClassModel(item)));
    } catch (error) {
      this.logger.error('Error finding classes');
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findByName(name: string): Promise<DataState<ClassModel>> {
    try {
      this.logger.log('Finding class by name');
      const data = await this.prismaService.class.findFirst({
        where: { name },
        include: {
          Level: true,
          Teacher: true,
        },
      });

      if (!data) {
        this.logger.warn('Class not found');
        return new DataFailed(new ErrorEntity(404, 'Class not found'));
      }

      this.logger.log('Successfully found class');
      return new DataSuccess(new ClassModel(data));
    } catch (error) {
      this.logger.error('Error finding class');
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async create(classData: ClassEntity): Promise<DataState<ClassModel>> {
    try {
      this.logger.log('Creating class');
      const data = await this.prismaService.class.create({
        data: {
          name: classData.name,
          level_id: classData.level_id,
          teacher_id: classData.teacher_id,
        },
        include: {
          Level: true,
          Teacher: true,
        },
      });

      this.logger.log('Successfully created class');
      return new DataSuccess(new ClassModel(data));
    } catch (error) {
      this.logger.error('Error creating class');
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async update(classData: ClassEntity): Promise<DataState<ClassModel>> {
    try {
      this.logger.log('Updating class');
      const data = await this.prismaService.class.update({
        where: { id: classData.id },
        data: {
          name: classData.name,
          level_id: classData.level_id,
          teacher_id: classData.teacher_id,
        },
        include: {
          Level: true,
          Teacher: true,
        },
      });

      this.logger.log('Successfully updated class');
      return new DataSuccess(new ClassModel(data));
    } catch (error) {
      this.logger.error('Error updating class');
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async delete(id: number): Promise<DataState<string>> {
    try {
      this.logger.log('Deleting class');
      await this.prismaService.class.delete({
        where: { id },
      });

      this.logger.log('Successfully deleted class');
      return new DataSuccess('OK');
    } catch (error) {
      this.logger.error('Error deleting class');
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
}

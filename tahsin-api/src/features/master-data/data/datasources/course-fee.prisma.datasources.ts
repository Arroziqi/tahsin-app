import { DataState, DataSuccess } from 'src/core/resources/data.state';
import { CourseFeeModel } from '../models/course-fee.model';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { ErrorEntity } from 'src/core/domain/entities/error.entity';

export interface CourseFeePrismaDatasources {
  findById(
    id: number,
    includeClass?: boolean,
  ): Promise<DataState<CourseFeeModel>>;

  findAll(includeClass?: boolean): Promise<DataState<CourseFeeModel[]>>;

  create(courseFee: CourseFeeModel): Promise<DataState<CourseFeeModel>>;

  update(courseFee: CourseFeeModel): Promise<DataState<CourseFeeModel>>;

  delete(id: number): Promise<DataState<string>>;
}

@Injectable()
export class CourseFeePrismaDatasourcesImpl
  implements CourseFeePrismaDatasources
{
  private readonly logger = new Logger(CourseFeePrismaDatasourcesImpl.name);

  constructor(private readonly prismaService: PrismaService) {}

  async findById(
    id: number,
    includeClass?: boolean,
  ): Promise<DataState<CourseFeeModel>> {
    try {
      this.logger.log(`Finding course fee with id: ${id}`);
      const data = await this.prismaService.courseFee.findFirst({
        where: { id },
      });

      if (!data) {
        this.logger.warn(`Could not find course fee with id ${id}`);
        throw new NotFoundException(`Could not find course fee with id ${id}`);
      }

      this.logger.log(`Successfully found course fee with id: ${id}`);
      return new DataSuccess(new CourseFeeModel(data));
    } catch (error) {
      this.logger.error(
        `Error finding course fee with id ${id}: ${error.message}`,
      );
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findAll(includeClass?: boolean): Promise<DataState<CourseFeeModel[]>> {
    try {
      this.logger.log(`Finding all course fees`);
      const data = await this.prismaService.courseFee.findMany({
        orderBy: {
          id: 'asc',
        },
      });

      if (data.length === 0) {
        this.logger.warn(`Could not find any course fees`);
        throw new ErrorEntity(404, `Could not find course fee`);
      }

      this.logger.log(`Successfully found all course fees`);
      return new DataSuccess(data.map((item) => new CourseFeeModel(item)));
    } catch (error) {
      this.logger.error(`Error finding all course fees: ${error.message}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async create(courseFee: CourseFeeModel): Promise<DataState<CourseFeeModel>> {
    try {
      this.logger.log(`Creating course fee`);
      const data = await this.prismaService.courseFee.create({
        data: courseFee,
      });

      this.logger.log(`Successfully created course fee`);
      return new DataSuccess(new CourseFeeModel(data));
    } catch (error) {
      this.logger.error(`Error creating course fee: ${error.message}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async update(courseFee: CourseFeeModel): Promise<DataState<CourseFeeModel>> {
    try {
      this.logger.log(`Updating course fee with id: ${courseFee.id}`);
      const data = await this.prismaService.courseFee.update({
        where: {
          id: courseFee.id,
        },
        data: courseFee,
      });

      if (!data) {
        this.logger.warn(`Course fee with id ${courseFee.id} not found`);
        throw new ErrorEntity(404, `Could not find course fee`);
      }

      this.logger.log(
        `Successfully updated course fee with id: ${courseFee.id}`,
      );
      return new DataSuccess(new CourseFeeModel(data));
    } catch (error) {
      this.logger.error(`Error updating course fee: ${error.message}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async delete(id: number): Promise<DataState<string>> {
    try {
      this.logger.log(`Deleting course fee with id: ${id}`);
      await this.prismaService.courseFee.delete({
        where: {
          id,
        },
      });

      this.logger.log(`Successfully deleted course fee with id: ${id}`);
      return new DataSuccess('OK');
    } catch (error) {
      this.logger.error(
        `Error deleting course fee with id ${id}: ${error.message}`,
      );
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
}

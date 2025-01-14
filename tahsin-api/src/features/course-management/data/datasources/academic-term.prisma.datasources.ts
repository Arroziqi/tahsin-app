import { Injectable, Logger } from '@nestjs/common';
import {
  DataFailed,
  DataState,
  DataSuccess,
} from '../../../../core/resources/data.state';
import { AcademicTermModel } from '../models/academic-term.model';
import { ErrorEntity } from '../../../../core/domain/entities/error.entity';
import { PrismaService } from '../../../../common/services/prisma.service';
import { AddAcademicTermDto } from '../../presentation/dto/academic-term/add-academicTerm.dto';
import { UpdateAcademicTermDto } from '../../presentation/dto/academic-term/update-academicTerm.dto';

export interface AcademicTermPrismaDatasources {
  findAll(): Promise<DataState<AcademicTermModel[]>>;
  findById(id: number): Promise<DataState<AcademicTermModel>>;
  findByName(name: string): Promise<DataState<AcademicTermModel>>;
  create(
    academicTerm: AddAcademicTermDto,
  ): Promise<DataState<AcademicTermModel>>;
  update(
    academicTerm: UpdateAcademicTermDto & { id: number },
  ): Promise<DataState<AcademicTermModel>>;
  delete(id: number): Promise<DataState<string>>;
}

@Injectable()
export class AcademicTermPrismaDatasourcesImpl
  implements AcademicTermPrismaDatasources
{
  private readonly logger = new Logger(AcademicTermPrismaDatasourcesImpl.name);
  constructor(private readonly prismaService: PrismaService) {}

  async findByName(name: string): Promise<DataState<AcademicTermModel>> {
    try {
      this.logger.log(`Finding academic term with name: ${name}`);
      const data = await this.prismaService.academicTerm.findFirst({
        where: { name },
      });

      if (!data) {
        this.logger.warn(`Academic term with name: ${name} not found`);
        return new DataFailed(new ErrorEntity(404, 'Academic term not found'));
      }

      this.logger.log(`Successfully found academic term with name: ${name}`);
      return new DataSuccess(new AcademicTermModel(data));
    } catch (error) {
      this.logger.error(`Error finding academic term with name: ${name}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
  async findAll(): Promise<DataState<AcademicTermModel[]>> {
    try {
      this.logger.log(`Finding academic terms`);
      const data = await this.prismaService.academicTerm.findMany({
        orderBy: {
          id: 'asc',
        },
      });

      if (!data || data.length === 0) {
        this.logger.warn(`Academic terms not found`);
        return new DataFailed(new ErrorEntity(404, 'Academic term not found'));
      }

      this.logger.log(`Successfully found academic terms`);
      return new DataSuccess(data.map((item) => new AcademicTermModel(item)));
    } catch (error) {
      this.logger.error(`Error finding academic terms`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
  async findById(id: number): Promise<DataState<AcademicTermModel>> {
    try {
      this.logger.log(`Finding academic term by id`);
      const data = await this.prismaService.academicTerm.findFirst({
        where: { id },
      });

      if (!data) {
        this.logger.warn(`Academic term by id not found`);
        return new DataFailed(new ErrorEntity(404, 'Academic term not found'));
      }

      this.logger.log(`Successfully found academic term by id`);
      return new DataSuccess(new AcademicTermModel(data));
    } catch (error) {
      this.logger.error(`Error finding academic term by id`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
  async create(
    academicTerm: Required<AddAcademicTermDto>,
  ): Promise<DataState<AcademicTermModel>> {
    try {
      this.logger.log(`creating academic term`);
      const data = await this.prismaService.academicTerm.create({
        data: academicTerm,
      });

      this.logger.log(`Successfully created academic term`);
      return new DataSuccess(new AcademicTermModel(data));
    } catch (error) {
      this.logger.error(`Error creating academic term`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
  async update(
    academicTerm: UpdateAcademicTermDto & { id: number },
  ): Promise<DataState<AcademicTermModel>> {
    try {
      this.logger.log(`updating academic term`);
      const data = await this.prismaService.academicTerm.update({
        where: { id: academicTerm.id },
        data: academicTerm,
      });

      this.logger.log(`Successfully updated academic term`);
      return new DataSuccess(new AcademicTermModel(data));
    } catch (error) {
      this.logger.error(`Error updating academic term`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
  async delete(id: number): Promise<DataState<string>> {
    try {
      this.logger.log(`deleting academic term`);
      await this.prismaService.academicTerm.delete({
        where: { id },
      });

      this.logger.log(`Successfully created academic term`);
      return new DataSuccess('OK');
    } catch (error) {
      this.logger.error(`Error deleting academic term`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
}

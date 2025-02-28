import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import {
  DataFailed,
  DataState,
  DataSuccess,
} from '../../../../core/resources/data.state';
import { ErrorEntity } from '../../../../core/domain/entities/error.entity';
import { PrismaService } from '../../../../common/services/prisma.service';
import { AcademicTermPaymentFeeModel } from '../models/academicTerm-paymentFee.model';
import { AddAcademicTermPaymentFeeDto } from '../../presentation/dto/academicTerm-paymentFee/add-AcademicTermPaymentFee.dto';
import { UpdateAcademicTermPaymentFeeDto } from '../../presentation/dto/academicTerm-paymentFee/update-academictermPaymentFee.dto';

export interface AcademicTermPaymentFeePrismaDatasources {
  findAll(): Promise<DataState<AcademicTermPaymentFeeModel[]>>;
  findById(id: number): Promise<DataState<AcademicTermPaymentFeeModel>>;
  findByAcademicTermId(
    academicTerm_id: number,
  ): Promise<DataState<AcademicTermPaymentFeeModel[]>>;
  findTuitionFeeByAcademicTermId(
    academicTerm_id: number,
  ): Promise<DataState<AcademicTermPaymentFeeModel>>;
  create(
    academicTermPaymentFee: AddAcademicTermPaymentFeeDto,
  ): Promise<DataState<AcademicTermPaymentFeeModel>>;
  update(
    academicTermPaymentFee: UpdateAcademicTermPaymentFeeDto & { id: number },
  ): Promise<DataState<AcademicTermPaymentFeeModel>>;
  delete(id: number): Promise<DataState<string>>;
}

@Injectable()
export class AcademicTermPaymentFeePrismaDatasourcesImpl
  implements AcademicTermPaymentFeePrismaDatasources
{
  private readonly logger = new Logger(
    AcademicTermPaymentFeePrismaDatasourcesImpl.name,
  );
  constructor(private readonly prismaService: PrismaService) {}

  async findTuitionFeeByAcademicTermId(
    academicTerm_id: number,
  ): Promise<DataState<AcademicTermPaymentFeeModel>> {
    try {
      this.logger.log(`Finding academic term tuition fee by id`);
      const data = await this.prismaService.academicTermPaymentFee.findFirst({
        where: { academicTerm_id, type: 'TUITION_FEE' },
      });

      if (!data) {
        this.logger.warn(`Academic term tuition fee by id not found`);
        return new DataFailed(
          new ErrorEntity(404, 'Academic term tuition fee not found'),
        );
      }

      this.logger.log(`Successfully found academic term tuition fee by id`);
      return new DataSuccess(new AcademicTermPaymentFeeModel(data));
    } catch (error) {
      this.logger.error(`Error finding academic term tuition fee by id`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findByAcademicTermId(
    academicTerm_id: number,
  ): Promise<DataState<AcademicTermPaymentFeeModel[]>> {
    try {
      this.logger.log(
        `Finding academic term payment fees for academic term id: ${academicTerm_id}`,
      );
      const data = await this.prismaService.academicTermPaymentFee.findMany({
        where: { academicTerm_id },
      });

      if (!data || data.length === 0) {
        this.logger.warn(
          `No academic term payment fees found for academic term id: ${academicTerm_id}`,
        );
        return new DataFailed(
          new ErrorEntity(404, 'Academic term payment fees not found'),
        );
      }

      this.logger.log(
        `Successfully found academic term payment fees for academic term id: ${academicTerm_id}`,
      );
      return new DataSuccess(
        data.map((item) => new AcademicTermPaymentFeeModel(item)),
      );
    } catch (error) {
      this.logger.error(
        `Error finding academic term payment fees for academic term id: ${academicTerm_id}`,
      );
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findAll(): Promise<DataState<AcademicTermPaymentFeeModel[]>> {
    try {
      this.logger.log(`Finding all academic term payment fees`);
      const data = await this.prismaService.academicTermPaymentFee.findMany({
        orderBy: {
          id: 'asc',
        },
      });

      if (!data || data.length === 0) {
        this.logger.warn(`No academic term payment fees found`);
        return new DataFailed(
          new ErrorEntity(404, 'Academic term payment fees not found'),
        );
      }

      this.logger.log(`Successfully found all academic term payment fees`);
      return new DataSuccess(
        data.map((item) => new AcademicTermPaymentFeeModel(item)),
      );
    } catch (error) {
      this.logger.error(`Error finding academic term payment fees`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findById(id: number): Promise<DataState<AcademicTermPaymentFeeModel>> {
    try {
      this.logger.log(`Finding academic term payment fee by id`);
      const data = await this.prismaService.academicTermPaymentFee.findFirst({
        where: { id },
      });

      if (!data) {
        this.logger.warn(`Academic term payment fee by id not found`);
        return new DataFailed(
          new ErrorEntity(404, 'Academic term payment fee not found'),
        );
      }

      this.logger.log(`Successfully found academic term payment fee by id`);
      return new DataSuccess(new AcademicTermPaymentFeeModel(data));
    } catch (error) {
      this.logger.error(`Error finding academic term payment fee by id`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async create(
    academicTermPaymentFee: Required<AddAcademicTermPaymentFeeDto>,
  ): Promise<DataState<AcademicTermPaymentFeeModel>> {
    try {
      this.logger.log(`Creating academic term payment fee`);
      const data = await this.prismaService.academicTermPaymentFee.create({
        data: academicTermPaymentFee,
      });

      this.logger.log(`Successfully created academic term payment fee`);
      return new DataSuccess(new AcademicTermPaymentFeeModel(data));
    } catch (error) {
      this.logger.error(`Error creating academic term payment fee`);
      if (error.code === 'P2003') {
        throw new ErrorEntity(
          HttpStatus.BAD_REQUEST,
          `${error.meta.field_name} not found in the database. Please ensure the provided event ID is valid.`,
        );
      }
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async update(
    academicTermPaymentFee: UpdateAcademicTermPaymentFeeDto & { id: number },
  ): Promise<DataState<AcademicTermPaymentFeeModel>> {
    try {
      this.logger.log(`Updating academic term payment fee`);
      const data = await this.prismaService.academicTermPaymentFee.update({
        where: { id: academicTermPaymentFee.id },
        data: academicTermPaymentFee,
      });

      this.logger.log(`Successfully updated academic term payment fee`);
      return new DataSuccess(new AcademicTermPaymentFeeModel(data));
    } catch (error) {
      this.logger.error(`Error updating academic term payment fee`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async delete(id: number): Promise<DataState<string>> {
    try {
      this.logger.log(`Deleting academic term payment fee`);
      await this.prismaService.academicTermPaymentFee.delete({
        where: { id },
      });

      this.logger.log(`Successfully deleted academic term payment fee`);
      return new DataSuccess('OK');
    } catch (error) {
      this.logger.error(`Error deleting academic term payment fee`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
}

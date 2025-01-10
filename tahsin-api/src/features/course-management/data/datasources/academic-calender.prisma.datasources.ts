import { Injectable, Logger } from '@nestjs/common';
import {
  DataFailed,
  DataState,
  DataSuccess,
} from '../../../../core/resources/data.state';
import { AcademicCalenderModel } from '../models/academic-calender.model';
import { ErrorEntity } from '../../../../core/domain/entities/error.entity';
import { PrismaService } from '../../../../common/services/prisma.service';
import { AddAcademicCalenderDto } from '../../presentation/dto/academic-calender/add-academicCalender.dto';
import { UpdateAcademicCalenderDto } from '../../presentation/dto/academic-calender/update-academicCalender.dto';

export interface AcademicCalenderPrismaDatasources {
  findAll(): Promise<DataState<AcademicCalenderModel[]>>;
  findById(id: number): Promise<DataState<AcademicCalenderModel>>;
  findByEventId(eventId: number): Promise<DataState<AcademicCalenderModel[]>>;
  findByAcademicTermId(
    academicTermId: number,
  ): Promise<DataState<AcademicCalenderModel[]>>;
  create(
    academicCalender: AddAcademicCalenderDto,
  ): Promise<DataState<AcademicCalenderModel>>;
  update(
    academicCalender: UpdateAcademicCalenderDto & { id: number },
  ): Promise<DataState<AcademicCalenderModel>>;
  delete(id: number): Promise<DataState<string>>;
}

@Injectable()
export class AcademicCalenderPrismaDatasourcesImpl
  implements AcademicCalenderPrismaDatasources
{
  private readonly logger = new Logger(
    AcademicCalenderPrismaDatasourcesImpl.name,
  );
  constructor(private readonly prismaService: PrismaService) {}

  async findByEventId(
    eventId: number,
  ): Promise<DataState<AcademicCalenderModel[]>> {
    try {
      this.logger.log(`Finding academic calender with event id: ${eventId}`);
      const data = await this.prismaService.academicCalender.findMany({
        where: { event_id: eventId },
        include: {
          AcademicTerm: true,
          Event: true,
        },
      });

      if (!data || data.length === 0) {
        this.logger.warn(
          `Academic calender with event id: ${eventId} not found`,
        );
        return new DataFailed(
          new ErrorEntity(404, 'Academic calender not found'),
        );
      }

      this.logger.log(
        `Successfully found academic calender with event id: ${eventId}`,
      );
      return new DataSuccess(
        data.map((item) => new AcademicCalenderModel(item)),
      );
    } catch (error) {
      this.logger.error(
        `Error finding academic calender with event id: ${eventId}`,
      );
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findByAcademicTermId(
    academicTermId: number,
  ): Promise<DataState<AcademicCalenderModel[]>> {
    try {
      this.logger.log(
        `Finding academic calender with academic term id: ${academicTermId}`,
      );
      const data = await this.prismaService.academicCalender.findMany({
        where: { academicTerm_id: academicTermId },
        include: {
          AcademicTerm: true,
          Event: true,
        },
      });

      if (!data || data.length === 0) {
        this.logger.warn(
          `Academic calender with academic term id: ${academicTermId} not found`,
        );
        return new DataFailed(
          new ErrorEntity(404, 'Academic calender not found'),
        );
      }

      this.logger.log(
        `Successfully found academic calender with academic term id: ${academicTermId}`,
      );
      return new DataSuccess(
        data.map((item) => new AcademicCalenderModel(item)),
      );
    } catch (error) {
      this.logger.error(
        `Error finding academic calender with academic term id: ${academicTermId}`,
      );
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findAll(): Promise<DataState<AcademicCalenderModel[]>> {
    try {
      this.logger.log(`Finding academic calenders`);
      const data = await this.prismaService.academicCalender.findMany({
        orderBy: {
          id: 'asc',
        },
        include: {
          AcademicTerm: true,
          Event: true,
        },
      });

      if (!data || data.length === 0) {
        this.logger.warn(`Academic calenders not found`);
        return new DataFailed(
          new ErrorEntity(404, 'Academic calender not found'),
        );
      }

      this.logger.log(`Successfully found academic calenders`);
      return new DataSuccess(
        data.map((item) => new AcademicCalenderModel(item)),
      );
    } catch (error) {
      this.logger.error(`Error finding academic calenders`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findById(id: number): Promise<DataState<AcademicCalenderModel>> {
    try {
      this.logger.log(`Finding academic calender by id`);
      const data = await this.prismaService.academicCalender.findFirst({
        where: { id },
        include: {
          AcademicTerm: true,
          Event: true,
        },
      });

      if (!data) {
        this.logger.warn(`Academic calender by id not found`);
        return new DataFailed(
          new ErrorEntity(404, 'Academic calender not found'),
        );
      }

      this.logger.log(`Successfully found academic calender by id`);
      return new DataSuccess(new AcademicCalenderModel(data));
    } catch (error) {
      this.logger.error(`Error finding academic calender by id`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
  async create(
    academicCalender: Required<AddAcademicCalenderDto>,
  ): Promise<DataState<AcademicCalenderModel>> {
    try {
      this.logger.log(`creating academic calender`);
      const data = await this.prismaService.academicCalender.create({
        data: academicCalender,
        include: {
          AcademicTerm: true,
          Event: true,
        },
      });

      this.logger.log(`Successfully created academic calender`);
      return new DataSuccess(new AcademicCalenderModel(data));
    } catch (error) {
      this.logger.error(`Error creating academic calender`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async update(
    academicCalender: UpdateAcademicCalenderDto & { id: number },
  ): Promise<DataState<AcademicCalenderModel>> {
    try {
      this.logger.log(`updating academic calender`);
      const data = await this.prismaService.academicCalender.update({
        where: { id: academicCalender.id },
        data: academicCalender,
        include: {
          AcademicTerm: true,
          Event: true,
        },
      });

      this.logger.log(`Successfully updated academic calender`);
      return new DataSuccess(new AcademicCalenderModel(data));
    } catch (error) {
      this.logger.error(`Error updating academic calender`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async delete(id: number): Promise<DataState<string>> {
    try {
      this.logger.log(`deleting academic calender`);
      await this.prismaService.academicCalender.delete({
        where: { id },
      });

      this.logger.log(`Successfully deleted academic calender`);
      return new DataSuccess('OK');
    } catch (error) {
      this.logger.error(`Error deleting academic calender`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
}

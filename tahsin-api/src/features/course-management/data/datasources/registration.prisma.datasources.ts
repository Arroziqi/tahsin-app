import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import {
  DataFailed,
  DataState,
  DataSuccess,
} from '../../../../core/resources/data.state';
import { ErrorEntity } from '../../../../core/domain/entities/error.entity';
import { PrismaService } from '../../../../common/services/prisma.service';
import { UpdateRegistrationDto } from '../../presentation/dto/registration/update-registration.dto';
import { RegistrationModel } from '../models/registration.model';
import { AddRegistrationDto } from '../../presentation/dto/registration/add-registration.dto';
import { AddManyRegistrationDto } from '../../presentation/dto/registration/addMany-registration.dto';

export interface RegistrationPrismaDatasources {
  findAll(): Promise<DataState<RegistrationModel[]>>;
  findById(id: number): Promise<DataState<RegistrationModel>>;
  findByUserId(user_id: number): Promise<DataState<RegistrationModel[]>>;
  findByAcademicTermId(
    academicTerm_id: number,
  ): Promise<DataState<RegistrationModel[]>>;
  create(
    registration: Required<AddRegistrationDto>,
  ): Promise<DataState<RegistrationModel>>;
  createMany(
    registrations: Required<AddManyRegistrationDto>[],
  ): Promise<DataState<RegistrationModel[]>>;
  update(
    registration: UpdateRegistrationDto & { id: number },
  ): Promise<DataState<RegistrationModel>>;
  delete(id: number): Promise<DataState<string>>;
}

@Injectable()
export class RegistrationPrismaDatasourcesImpl
  implements RegistrationPrismaDatasources
{
  private readonly logger = new Logger(RegistrationPrismaDatasourcesImpl.name);
  constructor(private readonly prismaService: PrismaService) {}

  async findByUserId(user_id: number): Promise<DataState<RegistrationModel[]>> {
    try {
      this.logger.log(`Finding registrations for user id: ${user_id}`);
      const data = await this.prismaService.registration.findMany({
        where: { user_id },
        include: { User: true, AcademicTerm: true },
      });

      if (!data || data.length === 0) {
        this.logger.warn(`No registrations found for user id: ${user_id}`);
        return new DataFailed(new ErrorEntity(404, 'Registrations not found'));
      }

      this.logger.log(
        `Successfully found registrations for user id: ${user_id}`,
      );
      return new DataSuccess(data);
    } catch (error) {
      this.logger.error(`Error finding registrations for user id: ${user_id}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findByAcademicTermId(
    academicTerm_id: number,
  ): Promise<DataState<RegistrationModel[]>> {
    try {
      this.logger.log(
        `Finding registrations for academic term id: ${academicTerm_id}`,
      );
      const data = await this.prismaService.registration.findMany({
        where: { academicTerm_id },
      });

      if (!data || data.length === 0) {
        this.logger.warn(
          `No registrations found for academic term id: ${academicTerm_id}`,
        );
        return new DataFailed(new ErrorEntity(404, 'Registrations not found'));
      }

      this.logger.log(
        `Successfully found registrations for academic term id: ${academicTerm_id}`,
      );
      return new DataSuccess(data);
    } catch (error) {
      this.logger.error(
        `Error finding registrations for academic term id: ${academicTerm_id}`,
      );
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findAll(): Promise<DataState<RegistrationModel[]>> {
    try {
      this.logger.log(`Finding all registrations`);
      const data = await this.prismaService.registration.findMany({
        orderBy: {
          id: 'asc',
        },
      });

      if (!data || data.length === 0) {
        this.logger.warn(`No registrations found`);
        return new DataFailed(new ErrorEntity(404, 'Registrations not found'));
      }

      this.logger.log(`Successfully found all registrations`);
      return new DataSuccess(data);
    } catch (error) {
      this.logger.error(`Error finding registrations`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findById(id: number): Promise<DataState<RegistrationModel>> {
    try {
      this.logger.log(`Finding registration by id`);
      const data = await this.prismaService.registration.findFirst({
        where: { id },
      });

      if (!data) {
        this.logger.warn(`Registration by id not found`);
        return new DataFailed(new ErrorEntity(404, 'Registration not found'));
      }

      this.logger.log(`Successfully found registration by id`);
      return new DataSuccess(data);
    } catch (error) {
      this.logger.error(`Error finding registration by id`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async create(
    registration: Required<AddRegistrationDto>,
  ): Promise<DataState<RegistrationModel>> {
    try {
      this.logger.log(`Creating registration`);
      const data = await this.prismaService.registration.create({
        data: registration,
        include: {
          AcademicTerm: true,
        },
      });

      this.logger.log(`Successfully created registration`);
      return new DataSuccess(data);
    } catch (error) {
      this.logger.error(`Error creating registration`);
      if (error.code === 'P2003') {
        throw new ErrorEntity(
          HttpStatus.BAD_REQUEST,
          `${error.meta.field_name} not found in the database. Please ensure the provided data is valid.`,
        );
      }
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async createMany(
    registrations: Required<AddManyRegistrationDto>[],
  ): Promise<DataState<RegistrationModel[]>> {
    try {
      this.logger.log(`Adding registrations to database`);
      const data = await this.prismaService.registration.createManyAndReturn({
        data: registrations,
        skipDuplicates: true,
      });

      this.logger.log(`Successfully added registrations`);
      return new DataSuccess(data);
    } catch (error) {
      this.logger.error(`Error adding registrations to database`);
      if (error.code === 'P2003') {
        throw new ErrorEntity(
          HttpStatus.BAD_REQUEST,
          `${error.meta.field_name} not found in the database. Please ensure the provided data is valid.`,
        );
      }
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async update(
    registration: UpdateRegistrationDto & { id: number },
  ): Promise<DataState<RegistrationModel>> {
    try {
      this.logger.log(`Updating registration`);
      const data = await this.prismaService.registration.update({
        where: { id: registration.id },
        data: registration,
        include: {
          User: true,
        },
      });

      this.logger.log(`Successfully updated registration`);
      return new DataSuccess(data);
    } catch (error) {
      this.logger.error(`Error updating registration`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async delete(id: number): Promise<DataState<string>> {
    try {
      this.logger.log(`Deleting registration`);
      await this.prismaService.registration.delete({
        where: { id },
      });

      this.logger.log(`Successfully deleted registration`);
      return new DataSuccess('OK');
    } catch (error) {
      this.logger.error(`Error deleting registration`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
}

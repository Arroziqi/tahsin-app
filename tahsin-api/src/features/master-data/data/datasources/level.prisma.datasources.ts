import { DataState } from 'src/core/resources/data.state';
import { LevelModel } from 'src/features/master-data/data/models/level.model';
import { PrismaService } from 'src/common/services/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { ErrorEntity } from 'src/core/domain/entities/error.entity';

export interface LevelPrismaDataSources {
  findById(id: number, includeClass?: boolean): Promise<DataState<LevelModel>>;

  findByName(
    name: string,
    includeClass?: boolean,
  ): Promise<DataState<LevelModel>>;

  findAll(includeClass?: boolean): Promise<DataState<LevelModel[]>>;

  create(level: LevelModel): Promise<DataState<LevelModel>>;

  update(level: LevelModel): Promise<DataState<LevelModel>>;

  delete(id: number): Promise<DataState<string>>;
}

@Injectable()
export class LevelPrismaDataSourcesImpl implements LevelPrismaDataSources {
  private readonly logger = new Logger(LevelPrismaDataSourcesImpl.name);

  constructor(private readonly prismaService: PrismaService) {}

  async findById(
    id: number,
    includeClass?: boolean,
  ): Promise<DataState<LevelModel>> {
    try {
      this.logger.log(`Finding level with id: ${id}`);
      const data = await this.prismaService.level.findFirst({
        where: { id },
      });

      if (!data) {
        this.logger.warn(`Level with id ${id} not found`);
        throw new ErrorEntity(404, 'Level not found');
      }

      this.logger.log(`Successfully found level with id: ${id}`);
      return { data: new LevelModel(data), error: undefined };
    } catch (error) {
      this.logger.error(`Error finding level with id ${id}: ${error.message}`);
      throw new ErrorEntity(500, error.message);
    }
  }

  async findByName(
    name: string,
    includeClass?: boolean,
  ): Promise<DataState<LevelModel>> {
    try {
      this.logger.log(`Finding level with name: ${name}`);
      const data = await this.prismaService.level.findFirst({
        where: { name },
      });

      if (!data) {
        this.logger.warn(`Level with name ${name} not found`);
        return {
          data: undefined,
          error: new ErrorEntity(404, 'Level not found'),
        };
      }

      this.logger.log(`Successfully found level with name: ${name}`);
      return { data: new LevelModel(data), error: undefined };
    } catch (error) {
      this.logger.error(
        `Error finding level with name ${name}: ${error.message}`,
      );
      throw new ErrorEntity(500, error.message);
    }
  }

  async findAll(includeClass?: boolean): Promise<DataState<LevelModel[]>> {
    try {
      this.logger.log(`Finding all levels`);
      const data = await this.prismaService.level.findMany({
        orderBy: {
          id: 'asc',
        },
      });

      if (data.length === 0) {
        this.logger.warn(`No levels found`);
        throw new ErrorEntity(404, 'No levels found');
      }

      this.logger.log(`Successfully found all levels`);
      return {
        data: data.map((level) => new LevelModel(level)),
        error: undefined,
      };
    } catch (error) {
      this.logger.error(`Error finding all levels: ${error.message}`);
      throw new ErrorEntity(500, error.message);
    }
  }

  async create(level: LevelModel): Promise<DataState<LevelModel>> {
    try {
      this.logger.log(`Creating level`);
      const data = await this.prismaService.level.create({
        data: level,
      });

      this.logger.log(`Successfully created level`);
      return { data: new LevelModel(data), error: undefined };
    } catch (error) {
      this.logger.error(`Error creating level: ${error.message}`);
      throw new ErrorEntity(500, error.message);
    }
  }

  async update(level: LevelModel): Promise<DataState<LevelModel>> {
    try {
      this.logger.log(`Updating level`);
      const data = await this.prismaService.level.update({
        where: { id: level.id },
        data: level,
      });

      if (!data) {
        this.logger.warn(`Level with id ${level.id} not found`);
        throw new ErrorEntity(404, 'Level not found');
      }

      this.logger.log(`Successfully updated level`);
      return { data: new LevelModel(data), error: undefined };
    } catch (error) {
      this.logger.error(`Error updating level: ${error.message}`);
      throw new ErrorEntity(500, error.message);
    }
  }

  async delete(id: number): Promise<DataState<string>> {
    try {
      this.logger.log(`Deleting level with id: ${id}`);
      await this.prismaService.level.delete({ where: { id } });

      this.logger.log(`Successfully deleted level with id: ${id}`);
      return { data: 'OK', error: undefined };
    } catch (error) {
      this.logger.error(`Error deleting level with id ${id}: ${error.message}`);
      throw new ErrorEntity(500, error.message);
    }
  }
}

import {
  DataFailed,
  DataState,
  DataSuccess,
} from 'src/core/resources/data.state';
import { ComponentModel } from 'src/features/master-data/data/models/component.model';
import { Injectable, Logger } from '@nestjs/common';
import { ErrorEntity } from 'src/core/domain/entities/error.entity';
import { PrismaService } from 'src/common/services/prisma.service';

export interface ComponentPrismaDatasources {
  findById(id: number): Promise<DataState<ComponentModel>>;

  findByName(name: string): Promise<DataState<ComponentModel>>;

  findAll(): Promise<DataState<ComponentModel[]>>;

  create(component: ComponentModel): Promise<DataState<ComponentModel>>;

  update(component: ComponentModel): Promise<DataState<ComponentModel>>;

  delete(id: number): Promise<DataState<string>>;
}

@Injectable()
export class ComponentPrismaDataSourcesImpl
  implements ComponentPrismaDatasources
{
  private readonly logger: Logger = new Logger(
    ComponentPrismaDataSourcesImpl.name,
  );

  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: number): Promise<DataState<ComponentModel>> {
    try {
      this.logger.log(`Finding component with id: ${id}`);
      const data = await this.prismaService.component.findFirst({
        where: { id },
      });

      if (!data) {
        this.logger.warn(`Component with id: ${id} not found`);
        throw new ErrorEntity(404, 'Component not found');
      }

      this.logger.log(`Successfully find component with id: ${id}`);
      return new DataSuccess(new ComponentModel(data));
    } catch (error) {
      this.logger.error(
        `Error finding component with id ${id}: ${error.message}`,
      );
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findByName(name: string): Promise<DataState<ComponentModel>> {
    try {
      this.logger.log(`Finding component with name: ${name}`);
      const data = await this.prismaService.component.findFirst({
        where: { name },
      });

      if (!data) {
        this.logger.warn(`Component with name: ${name} not found`);
        return new DataFailed(new ErrorEntity(404, 'Component not found'));
      }

      this.logger.log(`Successfully found component with name: ${name}`);
      return new DataSuccess(new ComponentModel(data));
    } catch (error) {
      this.logger.error(`Error finding component with name: ${name}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findAll(): Promise<DataState<ComponentModel[]>> {
    try {
      this.logger.log('Finding all components');
      const data = await this.prismaService.component.findMany({
        orderBy: {
          id: 'asc',
        },
      });

      if (!data || data.length === 0) {
        this.logger.warn('No components found');
        throw new ErrorEntity(404, 'Components not found');
      }

      this.logger.log('Successfully found all components');
      return new DataSuccess(
        data.map((component) => new ComponentModel(component)),
      );
    } catch (error) {
      this.logger.error(`Error finding all components: ${error.message}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async create(component: ComponentModel): Promise<DataState<ComponentModel>> {
    try {
      this.logger.log('Creating component');
      const data = await this.prismaService.component.create({
        data: component,
      });

      this.logger.log(`Successfully created component with id: ${data.id}`);
      return new DataSuccess(new ComponentModel(data));
    } catch (error) {
      this.logger.error(`Error creating component: ${error.message}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async update(component: ComponentModel): Promise<DataState<ComponentModel>> {
    try {
      this.logger.log(`Updating component with id: ${component.id}`);
      const data = await this.prismaService.component.update({
        where: { id: component.id },
        data: component,
      });

      this.logger.log(
        `Successfully updated component with id: ${component.id}`,
      );
      return new DataSuccess(new ComponentModel(data));
    } catch (error) {
      this.logger.error(`Error updating component with id: ${component.id}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async delete(id: number): Promise<DataState<string>> {
    try {
      this.logger.log(`Deleting component with id: ${id}`);
      await this.prismaService.component.delete({
        where: { id },
      });

      this.logger.log(`Successfully deleted component with id: ${id}`);
      return new DataSuccess('OK');
    } catch (error) {
      this.logger.error(`Error deleting component with id: ${id}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
}

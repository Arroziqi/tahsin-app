import { Injectable } from '@nestjs/common';
import { DataState } from 'src/core/resources/data.state';
import { RoleModel } from '../../models/role.model';
import { PrismaService } from 'src/common/services/prisma.service';
import { ErrorEntity } from 'src/core/domain/entities/error.entity';

export interface RolePrismaDataSources {
  findById(id: number, includeUsers?: boolean): Promise<DataState<RoleModel>>;

  findByName(
    name: string,
    includeUsers?: boolean,
  ): Promise<DataState<RoleModel>>;

  findAll(includeUsers?: boolean): Promise<DataState<RoleModel[]>>;

  create(role: RoleModel): Promise<DataState<RoleModel>>;

  update(role: RoleModel): Promise<DataState<RoleModel>>;

  delete(id: number): Promise<DataState<null>>;
}

@Injectable()
export class RolePrismaDataSourcesImpl implements RolePrismaDataSources {
  constructor(private readonly prismaService: PrismaService) {}

  async update(role: RoleModel): Promise<DataState<RoleModel>> {
    const data = await this.prismaService.role.update({
      where: { id: role.id },
      data: { name: role.name },
    });
    return { data: new RoleModel(data), error: undefined };
  }

  async delete(id: number): Promise<DataState<null>> {
    await this.prismaService.role.delete({
      where: { id },
    });
    return { data: null, error: undefined };
  }

  async findById(
    id: number,
    includeUsers?: boolean,
  ): Promise<DataState<RoleModel>> {
    try {
      const data = await this.prismaService.role.findFirst({
        where: {
          id: id,
        },
        include: {
          users: includeUsers,
        },
      });

      if (!data) {
        return {
          data: undefined,
          error: new ErrorEntity(404, 'Role not found'),
        };
      }

      return {
        data: new RoleModel({
          ...data,
          users: includeUsers ? data?.users : undefined,
        }),
        error: undefined,
      };
    } catch (error) {
      return {
        data: undefined,
        error: new ErrorEntity(500, error.message),
      };
    }
  }

  async findByName(
    name: string,
    includeUsers?: boolean,
  ): Promise<DataState<RoleModel>> {
    const role = await this.prismaService.role.findFirst({
      where: {
        name: name,
      },
      include: {
        users: includeUsers,
      },
    });

    return {
      data: new RoleModel({
        ...role,
        users: includeUsers ? role?.users : undefined,
      }),
      error: undefined,
    };
  }

  async findAll(includeUsers?: boolean): Promise<DataState<RoleModel[]>> {
    const roles = await this.prismaService.role.findMany({
      include: {
        users: includeUsers,
      },
    });

    return {
      data: roles.map(
        (role) =>
          new RoleModel({
            ...role,
            users: includeUsers ? role?.users : undefined,
          }),
      ),
      error: undefined,
    };
  }

  async create(role: RoleModel): Promise<DataState<RoleModel>> {
    const data = await this.prismaService.role.create({
      data: {
        name: role.name,
      },
    });

    return {
      data: new RoleModel(data),
      error: undefined,
    };
  }
}

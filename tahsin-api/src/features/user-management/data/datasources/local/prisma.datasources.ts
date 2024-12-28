import { DataState, DataSuccess } from 'src/core/resources/data.state';
import { UserModel } from '../../models/user.model';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { UserEntity } from 'src/features/user-management/domain/entities/user.entity';

export interface PrismaDataSources {
  findByUsername(
    username: string,
    includeRole?: boolean,
  ): Promise<DataState<UserModel>>;

  findByEmail(
    email: string,
    includeRole?: boolean,
  ): Promise<DataState<UserModel>>;

  findByEmails(emails: string[]): Promise<DataState<UserModel[]>>;

  findById(id: number, includeRole?: boolean): Promise<DataState<UserModel>>;

  create(user: UserModel): Promise<DataState<UserModel>>;

  createMany(users: UserEntity[]): Promise<DataState<UserEntity[]>>;

  updateHashedRefreshToken(
    userId: number,
    hashedRefreshToken: string | null,
  ): Promise<DataState<string>>;

  updateRole(userId: number, role_id: number): Promise<DataState<UserModel>>;

  update(user: UserModel): Promise<DataState<UserModel>>;

  delete(id: number): Promise<DataState<string>>;
}

@Injectable()
export class PrismaDataSourcesImpl implements PrismaDataSources {
  private readonly logger = new Logger(PrismaDataSourcesImpl.name);

  constructor(private prismaService: PrismaService) {}

  async findByUsername(
    username: string,
    includeRole?: boolean,
  ): Promise<DataState<UserModel>> {
    try {
      this.logger.debug(`Finding user by username: ${username}`);
      const users = await this.prismaService.user.findFirst({
        where: { username },
        include: { role: includeRole },
      });

      if (!users) {
        this.logger.debug(`No user found with username: ${username}`);
        return { data: null, error: undefined };
      }

      this.logger.debug('User found successfully');
      return {
        data: new UserModel({
          ...users,
          role: includeRole ? users.role : undefined,
        }),
        error: undefined,
      };
    } catch (error) {
      this.logger.error('Error finding user by username', {
        error: error.message,
      });
      throw error;
    }
  }

  async findByEmail(
    email: string,
    includeRole?: boolean,
  ): Promise<DataState<UserModel>> {
    try {
      this.logger.debug(`Finding user by email: ${email}`);
      const users = await this.prismaService.user.findFirst({
        where: { email },
        include: { role: includeRole },
      });

      if (!users) {
        this.logger.debug(`No user found with email: ${email}`);
        return { data: null, error: undefined };
      }

      this.logger.debug('User found successfully');
      return {
        data: new UserModel({
          ...users,
          role: includeRole ? users.role : undefined,
        }),
        error: undefined,
      };
    } catch (error) {
      this.logger.error('Error finding user by email', {
        error: error.message,
      });
      throw error;
    }
  }

  async findByEmails(emails: string[]): Promise<DataState<UserEntity[]>> {
    try {
      this.logger.debug(`Finding user by emails`);
      const users = await this.prismaService.user.findMany({
        where: { email: { in: emails } },
        include: { role: true },
      });

      if (!users) {
        this.logger.debug(`No user found with email`);
        return { data: null, error: undefined };
      }

      this.logger.debug('User found successfully');
      return new DataSuccess(users.map((user) => new UserModel(user)));
    } catch (error) {
      this.logger.error('Error finding user by email', {
        error: error.message,
      });
      throw error;
    }
  }

  async findById(
    id: number,
    includeRole?: boolean,
  ): Promise<DataState<UserModel>> {
    try {
      this.logger.debug(`Finding user by ID: ${id}`);
      const users = await this.prismaService.user.findFirst({
        where: { id },
        include: { role: includeRole },
      });

      if (!users) {
        this.logger.debug(`No user found with ID: ${id}`);
        return { data: null, error: undefined };
      }

      return {
        data: new UserModel({
          ...users,
          role: includeRole ? users.role : undefined,
        }),
        error: undefined,
      };
    } catch (error) {
      this.logger.error('Error finding user by ID', {
        error: error.message,
      });
      throw error;
    }
  }

  async create(user: UserModel): Promise<DataState<UserModel>> {
    try {
      this.logger.debug(`Creating new user with email: ${user.email}`);
      const data = await this.prismaService.user.create({
        data: {
          username: user.username,
          email: user.email,
          password: user.password,
          role_id: user.role_id,
        },
      });

      this.logger.debug('User created successfully');
      return {
        data: {
          id: data.id,
          username: data.username,
          email: data.email,
          password: data.password,
          role_id: data.role_id,
          hashedRefreshToken: data.hashedRefreshToken,
        },
        error: undefined,
      };
    } catch (error) {
      this.logger.error('Error creating user', {
        error: error.message,
      });
      throw error;
    }
  }

  async createMany(users: UserModel[]): Promise<DataState<UserModel[]>> {
    try {
      this.logger.debug(`Creating ${users.length} new users`);

      const data = await this.prismaService.user.createManyAndReturn({
        data: users.map((user) => ({
          username: user.username,
          email: user.email,
          password: user.password,
          role_id: user.role_id,
        })),
        skipDuplicates: true, // Optional: Prevents duplicate errors if needed
      });

      this.logger.debug(`${data.length} users created successfully`);

      return {
        data: data.map((user) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          password: user.password,
          role_id: user.role_id,
          hashedRefreshToken: user.hashedRefreshToken,
        })),
        error: undefined,
      };
    } catch (error) {
      this.logger.error('Error creating users', {
        error: error.message,
      });
      throw error;
    }
  }

  async updateHashedRefreshToken(
    userId: number,
    hashedRefreshToken: string | null,
  ): Promise<DataState<string>> {
    try {
      this.logger.debug(`Updating hashed refresh token for user ID: ${userId}`);

      await this.prismaService.user.update({
        where: { id: userId },
        data: {
          hashedRefreshToken,
        },
      });

      this.logger.debug('Hashed refresh token updated successfully');
      return {
        data: 'Hashed refresh token updated successfully',
        error: undefined,
      };
    } catch (error) {
      this.logger.error('Error updating hashed refresh token', {
        error: error.message,
      });
      throw error;
    }
  }

  async updateRole(
    userId: number,
    role_id: number,
  ): Promise<DataState<UserModel>> {
    try {
      this.logger.debug(`Updating role`);

      const data = await this.prismaService.user.update({
        where: { id: userId },
        data: {
          role_id,
        },
      });

      return new DataSuccess(new UserModel(data));
    } catch (error) {
      this.logger.error('Error updating role', {
        error: error.message,
      });
      throw error;
    }
  }

  async update(user: UserModel): Promise<DataState<UserModel>> {
    try {
      this.logger.debug(`Updating user with ID: ${user.id}`);

      const data = await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          email: user.email,
          username: user.username,
          password: user.password,
          role_id: user.role_id,
          hashedRefreshToken: user.hashedRefreshToken,
        },
      });

      this.logger.debug('User updated successfully');
      return {
        data: new UserModel({
          id: data.id,
          email: data.email,
          username: data.username,
          password: data.password,
          role_id: data.role_id,
          hashedRefreshToken: data.hashedRefreshToken,
        }),
        error: undefined,
      };
    } catch (error) {
      this.logger.error('Error updating user', {
        error: error.message,
      });
      throw error;
    }
  }

  async delete(id: number): Promise<DataState<string>> {
    try {
      this.logger.debug(`Deleting user with ID: ${id}`);
      await this.prismaService.user.delete({
        where: { id },
      });

      this.logger.debug('User deleted successfully');
      return {
        data: 'User deleted successfully',
        error: undefined,
      };
    } catch (error) {
      this.logger.error('Error deleting user', {
        error: error.message,
      });
      throw error;
    }
  }
}

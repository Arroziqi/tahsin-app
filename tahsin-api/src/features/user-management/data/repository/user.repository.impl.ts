import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repository/user.repository';
import { DataState } from 'src/core/resources/data.state';
import { UserEntity } from '../../domain/entities/user.entity';
import { USER_REPO_TOKEN } from 'src/core/const/provider.token';

@Injectable()
export abstract class UserRepositoryImpl implements UserRepository {
  constructor(
    @Inject(USER_REPO_TOKEN) private readonly userRepository: UserRepository,
  ) {}

  async findByUsername(
    username: string,
    includeRole?: boolean,
  ): Promise<DataState<UserEntity>> {
    return await this.userRepository.findByUsername(username, includeRole);
  }

  async findByEmail(
    email: string,
    includeRole?: boolean,
  ): Promise<DataState<UserEntity>> {
    return await this.userRepository.findByEmail(email, includeRole);
  }

  async findByEmails(emails: string[]): Promise<DataState<UserEntity[]>> {
    return await this.userRepository.findByEmails(emails);
  }

  async findById(
    id: number,
    includeRole?: boolean,
  ): Promise<DataState<UserEntity>> {
    return await this.userRepository.findById(id, includeRole);
  }

  async create(user: UserEntity): Promise<DataState<UserEntity>> {
    return await this.userRepository.create(user);
  }

  createMany(users: UserEntity[]): Promise<DataState<UserEntity[]>> {
    return this.userRepository.createMany(users);
  }

  async updateHashedRefreshToken(
    userId: number,
    hashedRefreshToken: string | null,
  ): Promise<DataState<string>> {
    return await this.userRepository.updateHashedRefreshToken(
      userId,
      hashedRefreshToken,
    );
  }

  async updateRole(
    userId: number,
    role_id: number,
  ): Promise<DataState<UserEntity>> {
    return await this.userRepository.updateRole(userId, role_id);
  }

  async update(user: UserEntity): Promise<DataState<UserEntity>> {
    return await this.userRepository.update(user);
  }

  async delete(id: number): Promise<DataState<string>> {
    return await this.userRepository.delete(id);
  }
}

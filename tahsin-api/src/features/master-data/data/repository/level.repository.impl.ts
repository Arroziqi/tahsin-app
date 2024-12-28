import { Inject, Injectable } from '@nestjs/common';
import { LevelRepository } from '../../domain/repository/level.repository';
import { DataState } from 'src/core/resources/data.state';
import { LevelEntity } from '../../domain/entities/level.entity';
import { LEVEL_REPO_TOKEN } from 'src/core/const/provider.token';

@Injectable()
export class LevelRepositoryImpl implements LevelRepository {
  constructor(
    @Inject(LEVEL_REPO_TOKEN) private readonly levelRepository: LevelRepository,
  ) {}

  async findById(
    id: number,
    includeClass?: boolean,
  ): Promise<DataState<LevelEntity>> {
    return await this.levelRepository.findById(id, includeClass);
  }
  async findByName(
    name: string,
    includeClass?: boolean,
  ): Promise<DataState<LevelEntity>> {
    return await this.levelRepository.findByName(name, includeClass);
  }
  async findAll(includeClass?: boolean): Promise<DataState<LevelEntity[]>> {
    return await this.levelRepository.findAll(includeClass);
  }
  async create(level: LevelEntity): Promise<DataState<LevelEntity>> {
    return await this.levelRepository.create(level);
  }
  async update(level: LevelEntity): Promise<DataState<LevelEntity>> {
    return await this.levelRepository.update(level);
  }
  async delete(id: number): Promise<DataState<string>> {
    return await this.levelRepository.delete(id);
  }
}

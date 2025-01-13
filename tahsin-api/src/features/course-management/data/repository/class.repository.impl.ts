import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClassRepository } from '../../domain/repositories/class.repository';
import { DataState } from 'src/core/resources/data.state';
import { ClassEntity } from '../../domain/entities/class.entity';
import { CLASS_REPO_TOKEN } from '../../../../core/const/provider.token';

@Injectable()
export class ClassRepositoryImpl implements ClassRepository {
  private readonly logger = new Logger(ClassRepositoryImpl.name);
  constructor(
    @Inject(CLASS_REPO_TOKEN)
    private readonly classRepository: ClassRepository,
  ) {}

  async findAll(): Promise<DataState<ClassEntity[]>> {
    return await this.classRepository.findAll();
  }

  async findById(id: number): Promise<DataState<ClassEntity>> {
    return await this.classRepository.findById(id);
  }

  async findByUserId(user_id: number): Promise<DataState<ClassEntity[]>> {
    return await this.classRepository.findByUserId(user_id);
  }

  async findByLevelId(level_id: number): Promise<DataState<ClassEntity[]>> {
    return await this.classRepository.findByLevelId(level_id);
  }

  async findByName(name: string): Promise<DataState<ClassEntity>> {
    return await this.classRepository.findByName(name);
  }

  async create(data: ClassEntity): Promise<DataState<ClassEntity>> {
    return await this.classRepository.create(data);
  }

  async update(data: ClassEntity): Promise<DataState<ClassEntity>> {
    return await this.classRepository.update(data);
  }

  async delete(id: number): Promise<DataState<string>> {
    return await this.classRepository.delete(id);
  }
}

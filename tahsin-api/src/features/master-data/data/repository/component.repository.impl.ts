import { Inject, Injectable } from '@nestjs/common';
import { ComponentRepository } from '../../domain/repository/component.repository';
import { DataState } from 'src/core/resources/data.state';
import { ComponentEntity } from '../../domain/entities/component.entity';
import { COMPONENT_REPO_TOKEN } from 'src/core/const/provider.token';

@Injectable()
export class ComponentRepositoryImpl implements ComponentRepository {
  constructor(
    @Inject(COMPONENT_REPO_TOKEN)
    private readonly componentRepository: ComponentRepository,
  ) {}

  async findById(id: number): Promise<DataState<ComponentEntity>> {
    return await this.componentRepository.findById(id);
  }

  async findByName(name: string): Promise<DataState<ComponentEntity>> {
    return await this.componentRepository.findByName(name);
  }

  async findAll(): Promise<DataState<ComponentEntity[]>> {
    return await this.componentRepository.findAll();
  }

  async create(
    component: ComponentEntity,
  ): Promise<DataState<ComponentEntity>> {
    return await this.componentRepository.create(component);
  }

  async update(
    component: ComponentEntity,
  ): Promise<DataState<ComponentEntity>> {
    return await this.componentRepository.update(component);
  }

  async delete(id: number): Promise<DataState<string>> {
    return await this.componentRepository.delete(id);
  }
}

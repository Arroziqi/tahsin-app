import { DataState } from 'src/core/resources/data.state';
import { ComponentEntity } from 'src/features/master-data/domain/entities/component.entity';

export interface ComponentRepository {
  findById(id: number): Promise<DataState<ComponentEntity>>;

  findByName(name: string): Promise<DataState<ComponentEntity>>;

  findAll(): Promise<DataState<ComponentEntity[]>>;

  create(component: ComponentEntity): Promise<DataState<ComponentEntity>>;

  update(component: ComponentEntity): Promise<DataState<ComponentEntity>>;

  delete(id: number): Promise<DataState<string>>;
}

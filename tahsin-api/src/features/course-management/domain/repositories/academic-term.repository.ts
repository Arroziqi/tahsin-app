import { DataState } from '../../../../core/resources/data.state';
import { AcademicTermEntity } from '../entities/academic-term.entity';

export interface AcademicTermRepository {
  findAll(): Promise<DataState<AcademicTermEntity[]>>;
  findById(id: number): Promise<DataState<AcademicTermEntity>>;
  findByName(name: string): Promise<DataState<AcademicTermEntity>>;
  create(
    academicTerm: AcademicTermEntity,
  ): Promise<DataState<AcademicTermEntity>>;
  update(
    academicTerm: AcademicTermEntity,
  ): Promise<DataState<AcademicTermEntity>>;
  delete(id: number): Promise<DataState<string>>;
}

import { Injectable } from '@nestjs/common';
import { DataState } from '../../../../core/resources/data.state';
import { AcademicTermModel } from '../models/academic-term.model';

export interface AcademicTermPrismaDatasources {
  findAll(): Promise<DataState<AcademicTermModel[]>>;
  findById(id: number): Promise<DataState<AcademicTermModel>>;
  create(
    academicTerm: AcademicTermModel,
  ): Promise<DataState<AcademicTermModel>>;
  update(
    academicTerm: AcademicTermModel,
  ): Promise<DataState<AcademicTermModel>>;
  delete(id: number): Promise<DataState<string>>;
}

@Injectable()
export class AcademicTermPrismaDatasourcesImpl
  implements AcademicTermPrismaDatasources
{
  findAll(): Promise<DataState<AcademicTermModel[]>> {
    throw new Error('Method not implemented.');
  }
  findById(id: number): Promise<DataState<AcademicTermModel>> {
    throw new Error('Method not implemented.');
  }
  create(
    academicTerm: AcademicTermModel,
  ): Promise<DataState<AcademicTermModel>> {
    throw new Error('Method not implemented.');
  }
  update(
    academicTerm: AcademicTermModel,
  ): Promise<DataState<AcademicTermModel>> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<DataState<string>> {
    throw new Error('Method not implemented.');
  }
}

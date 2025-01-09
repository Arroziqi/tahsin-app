import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { AcademicTermEntity } from '../../entities/academic-term.entity';
import { DataState } from '../../../../../core/resources/data.state';

@Injectable()
export class AddAcademicTermUsecase
  implements UseCase<AcademicTermEntity, DataState<AcademicTermEntity>>
{
  execute(input: AcademicTermEntity): Promise<DataState<AcademicTermEntity>> {
    throw new Error('Method not implemented.');
  }
}

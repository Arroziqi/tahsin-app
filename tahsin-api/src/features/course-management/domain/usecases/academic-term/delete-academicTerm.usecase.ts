import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';

@Injectable()
export class DeleteAcademicTermUsecase implements UseCase<number, string> {
  execute(input: number): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

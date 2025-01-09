import { Inject, Injectable, Logger } from '@nestjs/common';
import { AcademicTermRepository } from '../../domain/repositories/academic-term.repository';
import { DataState } from 'src/core/resources/data.state';
import { AcademicTermEntity } from '../../domain/entities/academic-term.entity';
import { ACADEMIC_TERMS_REPO_TOKEN } from '../../../../core/const/provider.token';

@Injectable()
export class AcademicTermRepositoryImpl implements AcademicTermRepository {
  private readonly logger = new Logger(AcademicTermRepositoryImpl.name);
  constructor(
    @Inject(ACADEMIC_TERMS_REPO_TOKEN)
    private readonly academicTermRepository: AcademicTermRepository,
  ) {}

  async findAll(): Promise<DataState<AcademicTermEntity[]>> {
    return await this.academicTermRepository.findAll();
  }

  async findById(id: number): Promise<DataState<AcademicTermEntity>> {
    return await this.academicTermRepository.findById(id);
  }

  async create(
    academicTerm: AcademicTermEntity,
  ): Promise<DataState<AcademicTermEntity>> {
    return await this.academicTermRepository.create(academicTerm);
  }

  async update(
    academicTerm: AcademicTermEntity,
  ): Promise<DataState<AcademicTermEntity>> {
    return await this.academicTermRepository.update(academicTerm);
  }

  async delete(id: number): Promise<DataState<string>> {
    return await this.academicTermRepository.delete(id);
  }
}

import { Inject, Injectable, Logger } from '@nestjs/common';
import { RegistrationRepository } from '../../domain/repositories/registration.repository';
import { DataState } from 'src/core/resources/data.state';
import { RegistrationEntity } from '../../domain/entities/registration.entity';
import { REGISTRATION_REPO_TOKEN } from '../../../../core/const/provider.token';

@Injectable()
export class RegistrationRepositoryImpl implements RegistrationRepository {
  private readonly logger = new Logger(RegistrationRepositoryImpl.name);
  constructor(
    @Inject(REGISTRATION_REPO_TOKEN)
    private readonly registrationRepository: RegistrationRepository,
  ) {}

  async createMany(
    registrations: RegistrationEntity[],
  ): Promise<DataState<RegistrationEntity[]>> {
    return await this.registrationRepository.createMany(registrations);
  }

  async findByUserId(
    user_id: number,
  ): Promise<DataState<RegistrationEntity[]>> {
    return await this.registrationRepository.findByUserId(user_id);
  }

  async findByAcademicTermId(
    academicTerm_id: number,
  ): Promise<DataState<RegistrationEntity[]>> {
    return await this.registrationRepository.findByAcademicTermId(
      academicTerm_id,
    );
  }

  async findAll(): Promise<DataState<RegistrationEntity[]>> {
    return await this.registrationRepository.findAll();
  }

  async findById(id: number): Promise<DataState<RegistrationEntity>> {
    return await this.registrationRepository.findById(id);
  }

  async create(
    registration: RegistrationEntity,
  ): Promise<DataState<RegistrationEntity>> {
    return await this.registrationRepository.create(registration);
  }

  async update(
    registration: RegistrationEntity,
  ): Promise<DataState<RegistrationEntity>> {
    return await this.registrationRepository.update(registration);
  }

  async delete(id: number): Promise<DataState<string>> {
    return await this.registrationRepository.delete(id);
  }
}

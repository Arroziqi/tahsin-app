import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { DataState } from '../../../../../core/resources/data.state';
import { RegistrationEntity } from '../../entities/registration.entity';
import { REGISTRATION_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { RegistrationRepository } from '../../repositories/registration.repository';

@Injectable()
export class GetAllRegistrationUsecase
  implements UseCase<void, DataState<RegistrationEntity[]>>
{
  private readonly logger = new Logger(GetAllRegistrationUsecase.name);
  constructor(
    @Inject(REGISTRATION_REPO_TOKEN)
    private readonly registrationRepository: RegistrationRepository,
  ) {}

  async execute(): Promise<DataState<RegistrationEntity[]>> {
    this.logger.debug('Getting all registrations');
    const result: DataState<RegistrationEntity[]> =
      await this.registrationRepository.findAll();

    this.logger.log('Successfully retrieved all registrations');
    return result;
  }
}

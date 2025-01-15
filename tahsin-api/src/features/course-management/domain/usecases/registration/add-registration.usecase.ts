import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { RegistrationEntity } from '../../entities/registration.entity';
import { DataState } from '../../../../../core/resources/data.state';
import { RegistrationService } from '../../services/registration.service';
import { REGISTRATION_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { RegistrationRepository } from '../../repositories/registration.repository';

@Injectable()
export class AddRegistrationUsecase
  implements UseCase<RegistrationEntity, DataState<RegistrationEntity>>
{
  private readonly logger = new Logger(AddRegistrationUsecase.name);
  constructor(
    private readonly registrationService: RegistrationService,
    @Inject(REGISTRATION_REPO_TOKEN)
    private readonly registrationRepository: RegistrationRepository,
  ) {}

  async execute(
    input: RegistrationEntity,
  ): Promise<DataState<RegistrationEntity>> {
    await this.registrationService.checkDuplicateRegistration(
      input.user_id,
      input.academicTerm_id,
    );

    this.logger.debug('Creating registration');
    const result = await this.registrationRepository.create(input);

    this.logger.log(`new registration created`);
    return result;
  }
}

import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { RegistrationEntity } from '../../entities/registration.entity';
import { DataState } from '../../../../../core/resources/data.state';
import { REGISTRATION_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { RegistrationRepository } from '../../repositories/registration.repository';
import { RegistrationService } from '../../services/registration.service';
import { LevelService } from '../../../../master-data/domain/services/level.service';

@Injectable()
export class UpdateLevelRegistrationUsecase
  implements UseCase<RegistrationEntity, DataState<RegistrationEntity>>
{
  private readonly logger = new Logger(UpdateLevelRegistrationUsecase.name);
  constructor(
    @Inject(REGISTRATION_REPO_TOKEN)
    private readonly registrationRepository: RegistrationRepository,
    private readonly registrationService: RegistrationService,
    private readonly levelService: LevelService,
  ) {}

  async execute(
    input: RegistrationEntity,
  ): Promise<DataState<RegistrationEntity>> {
    const existingRegistration = await this.registrationService.getRegistration(
      input.id,
    );

    await this.levelService.checkExistingLevelWithId(input.level_id);

    const data: RegistrationEntity = {
      ...input,
      created_at: existingRegistration.data.created_at,
    };

    this.logger.debug('Updating level registration');
    const result = await this.registrationRepository.update(data);

    this.logger.log('Successfully updated level registration');
    return result;
  }
}

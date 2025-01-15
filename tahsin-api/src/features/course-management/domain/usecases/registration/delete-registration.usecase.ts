import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { DataState } from '../../../../../core/resources/data.state';
import { REGISTRATION_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { RegistrationRepository } from '../../repositories/registration.repository';
import { RegistrationService } from '../../services/registration.service';

@Injectable()
export class DeleteRegistrationUsecase
  implements UseCase<number, DataState<string>>
{
  private readonly logger = new Logger(DeleteRegistrationUsecase.name);
  constructor(
    @Inject(REGISTRATION_REPO_TOKEN)
    private readonly registrationRepository: RegistrationRepository,
    private readonly registrationService: RegistrationService,
  ) {}
  async execute(input: number): Promise<DataState<string>> {
    await this.registrationService.checkExistingRegistration(input);

    this.logger.debug(`Deleting registration`);
    const result = await this.registrationRepository.delete(input);

    this.logger.log('Successfully deleted registration');
    return result;
  }
}

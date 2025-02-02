import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { RegistrationEntity } from '../../entities/registration.entity';
import { DataState } from '../../../../../core/resources/data.state';
import { RegistrationService } from '../../services/registration.service';
import { REGISTRATION_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { RegistrationRepository } from '../../repositories/registration.repository';
import { UserService } from '../../../../user-management/domain/services/user.service';

@Injectable()
export class AddManyRegistrationUsecase
  implements UseCase<RegistrationEntity[], DataState<RegistrationEntity[]>>
{
  private readonly logger = new Logger(AddManyRegistrationUsecase.name);
  constructor(
    private readonly registrationService: RegistrationService,
    @Inject(REGISTRATION_REPO_TOKEN)
    private readonly registrationRepository: RegistrationRepository,
    private readonly userService: UserService,
  ) {}

  async execute(
    input: RegistrationEntity[],
  ): Promise<DataState<RegistrationEntity[]>> {
    try {
      await Promise.all(
        input.map(async (registration: RegistrationEntity) => {
          await this.userService.checkExistingUserWithId(registration.user_id);
          await this.registrationService.checkDuplicateRegistration(
            registration.user_id,
            registration.academicTerm_id,
          );
        }),
      );
    } catch (error) {
      this.logger.error(`error checking registrations: ${error.message}`);
      throw new BadRequestException(error);
    }

    this.logger.debug('Creating registrations');
    let result: DataState<RegistrationEntity[]>;
    try {
      result = await this.registrationRepository.createMany(input);
    } catch (error) {
      this.logger.error(
        'Error creating registrations',
        error.statusCode,
        error.message,
      );
      throw new BadRequestException(error);
    }

    this.logger.debug(`Successfully created registrations`);
    return result;
  }
}

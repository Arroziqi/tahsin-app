import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { REGISTRATION_REPO_TOKEN } from '../../../../core/const/provider.token';
import { RegistrationRepository } from '../repositories/registration.repository';
import { RegistrationEntity } from '../entities/registration.entity';
import { DataState } from 'src/core/resources/data.state';
import { ErrorEntity } from '../../../../core/domain/entities/error.entity';

@Injectable()
export class RegistrationService {
  private readonly logger = new Logger(RegistrationService.name);
  constructor(
    @Inject(REGISTRATION_REPO_TOKEN)
    private readonly registrationRepository: RegistrationRepository,
  ) {}

  async checkDuplicateRegistration(
    userId: number,
    academicTerm_id: number,
  ): Promise<void> {
    this.logger.debug(`Checking for duplicate registrations...`);
    const existingRegistration =
      await this.registrationRepository.findByUserId(userId);

    if (
      existingRegistration.data &&
      existingRegistration.data.some(
        (reg) => reg.academicTerm_id === academicTerm_id,
      )
    ) {
      const userNames = existingRegistration.data
        .map((reg) => reg.User.username)
        .join(', '); // Assuming userName is part of the registration data
      this.logger.warn(
        `Registration already exists for user(s) ${userNames} in this academic term...`,
      );
      throw new ErrorEntity(
        409,
        `Registration already exists for user(s) ${userNames} in this academic term.`,
        `Conflict Exception`,
      );
    }
  }

  async checkExistingRegistration(id: number): Promise<void> {
    this.logger.debug(`Checking for existing registrations...`);
    const existingRegistration = await this.registrationRepository.findById(id);

    if (!existingRegistration.data) {
      this.logger.warn(`Registration not found...`);
      throw new ConflictException('Registration not found.');
    }
  }

  async getRegistration(id: number): Promise<DataState<RegistrationEntity>> {
    await this.checkExistingRegistration(id);
    return await this.registrationRepository.findById(id);
  }
}

import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { REGISTRATION_REPO_TOKEN } from '../../../../core/const/provider.token';
import { RegistrationRepository } from '../repositories/registration.repository';
import { RegistrationEntity } from '../entities/registration.entity';
import { DataState } from 'src/core/resources/data.state';
import { ErrorEntity } from '../../../../core/domain/entities/error.entity';
import { ProfileEntity } from '../../../user-management/domain/entities/profile.entity';
import { ProfileService } from '../../../user-management/domain/services/profile.service';
import { AcademicTermPaymentFeeEntity } from '../entities/academicTerm-paymentFee.entity';
import { AcademicTermPaymentFeeService } from './academicTerm-paymentFee.service';

@Injectable()
export class RegistrationService {
  private readonly logger = new Logger(RegistrationService.name);
  constructor(
    @Inject(REGISTRATION_REPO_TOKEN)
    private readonly registrationRepository: RegistrationRepository,
    private readonly profileService: ProfileService,
    private readonly academicTermPaymentFeeService: AcademicTermPaymentFeeService,
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

  async checkExistingProfileWithUserId(userId: number): Promise<void> {
    this.logger.debug(`Checking profile with user id: ${userId}`);
    const existingProfileWithUserId: DataState<ProfileEntity> =
      await this.profileService.checkExistingProfileWithUserId(userId);

    if (existingProfileWithUserId.error) {
      this.logger.warn(
        `Profile with user id ${existingProfileWithUserId.error}`,
      );
      throw new NotFoundException(`Please create profile first!`);
    }
  }

  async getTuitionFeeByAcademicTermId(
    academicTermId: number,
  ): Promise<DataState<AcademicTermPaymentFeeEntity>> {
    this.logger.debug('getting tuition fee');
    const tuitionFee: DataState<AcademicTermPaymentFeeEntity> =
      await this.academicTermPaymentFeeService.getTuitionFeeByAcademicTermId(
        academicTermId,
      );

    if (tuitionFee.error) {
      throw new ErrorEntity(
        404,
        `please create academic term payment fee first`,
        `tuition fee not found.`,
      );
    }

    return tuitionFee;
  }
}

import {
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../../../user-management/guards/roles/roles.guard';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { DataState } from '../../../../core/resources/data.state';
import { AddRegistrationUsecase } from '../../domain/usecases/registration/add-registration.usecase';
import { UpdateRegistrationUsecase } from '../../domain/usecases/registration/update-registration.usecase';
import { DeleteRegistrationUsecase } from '../../domain/usecases/registration/delete-registration.usecase';
import { RegistrationEntity } from '../../domain/entities/registration.entity';
import { AddRegistrationPipe } from '../../pipes/registration/add-registration.pipe';
import { UpdateRegistrationPipe } from '../../pipes/registration/update-registration.pipe';
import { GetAllRegistrationUsecase } from '../../domain/usecases/registration/getAll-registration.usecase';
import { UserBody } from 'src/common/decorators/user-body.decorator';
import { AdminBody } from '../../../../common/decorators/admin-body.decorator';
import { AddManyRegistrationPipe } from '../../pipes/registration/addMany-registration.pipe';
import { AddManyRegistrationUsecase } from '../../domain/usecases/registration/addMany-registration.usecase';

@Controller('/api/registrations')
@UseGuards(RolesGuard)
@Roles(['Admin', 'Student'])
export class RegistrationController {
  private readonly logger = new Logger(RegistrationController.name);
  constructor(
    private readonly getAllRegistrationsUsecase: GetAllRegistrationUsecase,
    private readonly addRegistrationUsecase: AddRegistrationUsecase,
    private readonly addManyRegistrationUsecase: AddManyRegistrationUsecase,
    private readonly updateRegistrationUsecase: UpdateRegistrationUsecase,
    private readonly deleteRegistrationUsecase: DeleteRegistrationUsecase,
  ) {}

  @Get()
  @Roles(['Admin'])
  async getRegistrations(): Promise<DataState<RegistrationEntity[]>> {
    try {
      this.logger.debug('Getting all registrations');
      const result = await this.getAllRegistrationsUsecase.execute();

      this.logger.log('Successfully retrieved all registrations');
      return result;
    } catch (error) {
      this.logger.error('Failed to get registrations', {
        error: error.message,
      });
      throw error;
    }
  }

  @Post()
  async createRegistration(
    @UserBody(AddRegistrationPipe) request: RegistrationEntity,
  ): Promise<DataState<RegistrationEntity>> {
    try {
      this.logger.debug('Creating registration', { request });
      const result = await this.addRegistrationUsecase.execute(request);

      this.logger.log('Successfully created registration');
      return result;
    } catch (error) {
      this.logger.error('Failed to create registration', {
        error: error.message,
      });
      throw error;
    }
  }

  @Post('/create-many')
  @UseGuards(RolesGuard)
  @Roles(['Admin'])
  async createManyRegistrations(
    @AdminBody(AddManyRegistrationPipe) registrations: RegistrationEntity[],
  ): Promise<DataState<RegistrationEntity[]>> {
    return await this.addManyRegistrationUsecase.execute(registrations);
  }

  @Patch(':id')
  async updateRegistration(
    @Param('id', ParseIntPipe) id: number,
    @UserBody(UpdateRegistrationPipe) request: RegistrationEntity,
  ): Promise<DataState<RegistrationEntity>> {
    try {
      this.logger.debug('Updating registration', { id, request });
      const result = await this.updateRegistrationUsecase.execute({
        id,
        ...request,
      });

      this.logger.log('Successfully updated registration');
      return result;
    } catch (error) {
      this.logger.error('Failed to update registration', {
        error: error.message,
      });
      throw error;
    }
  }

  @Delete(':id')
  async deleteRegistration(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DataState<string>> {
    try {
      this.logger.debug('Deleting registration', { id });
      const result = await this.deleteRegistrationUsecase.execute(id);

      this.logger.log('Successfully deleted registration');
      return result;
    } catch (error) {
      this.logger.error('Failed to delete registration', {
        error: error.message,
      });
      throw error;
    }
  }
}

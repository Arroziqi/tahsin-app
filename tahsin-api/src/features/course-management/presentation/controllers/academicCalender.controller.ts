import {
  Body,
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
import { UpdateAcademicCalenderPipe } from '../../pipes/academic-calender/update-academicCalender.pipe';
import { AddAcademicCalenderPipe } from '../../pipes/academic-calender/add-academicCalender.pipe';
import { AddAcademicCalenderUsecase } from '../../domain/usecases/academic-calender/add-academicCalender.usecase';
import { DeleteAcademicCalenderUsecase } from '../../domain/usecases/academic-calender/delete-academicCalender.usecase';
import { GetAllAcademicCalenderUsecase } from '../../domain/usecases/academic-calender/getAll-academicCalender.usecase';
import { UpdateAcademicCalenderUsecase } from '../../domain/usecases/academic-calender/update-academicCalender.usecase';
import { AcademicCalenderEntity } from '../../domain/entities/academic-calender.entity';

@Controller('/api/academic-calenders')
@UseGuards(RolesGuard)
@Roles(['Admin'])
export class AcademicCalenderController {
  private readonly logger = new Logger(AcademicCalenderController.name);
  constructor(
    private readonly getAllAcademicCalenderUsecase: GetAllAcademicCalenderUsecase,
    private readonly addAcademicCalenderUsecase: AddAcademicCalenderUsecase,
    private readonly updateAcademicCalenderUsecase: UpdateAcademicCalenderUsecase,
    private readonly deleteAcademicCalenderUsecase: DeleteAcademicCalenderUsecase,
  ) {}

  @Get()
  async getAcademicCalenders(): Promise<DataState<AcademicCalenderEntity[]>> {
    try {
      this.logger.debug('Getting all academic calenders');
      const result = await this.getAllAcademicCalenderUsecase.execute();

      this.logger.log('Successfully retrieved all academic calenders');
      return result;
    } catch (error) {
      this.logger.error('Failed to get academic calenders', {
        error: error.message,
      });
      throw error;
    }
  }

  @Post()
  async createAcademicCalender(
    @Body(AddAcademicCalenderPipe) request: AcademicCalenderEntity,
  ): Promise<DataState<AcademicCalenderEntity>> {
    try {
      this.logger.debug('Creating academic calender', { request });
      const result = await this.addAcademicCalenderUsecase.execute(request);

      this.logger.log('Successfully created academic calender');
      return result;
    } catch (error) {
      this.logger.error('Failed to create academic calender', {
        error: error.message,
      });
      throw error;
    }
  }

  @Patch(':id')
  async updateAcademicCalender(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateAcademicCalenderPipe) request: AcademicCalenderEntity,
  ): Promise<DataState<AcademicCalenderEntity>> {
    try {
      this.logger.debug('Updating academic calender', { id, request });
      const result = await this.updateAcademicCalenderUsecase.execute({
        id,
        ...request,
      });

      this.logger.log('Successfully updated academic calender');
      return result;
    } catch (error) {
      this.logger.error('Failed to update academic calender', {
        error: error.message,
      });
      throw error;
    }
  }

  @Delete(':id')
  async deleteAcademicCalender(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DataState<string>> {
    try {
      this.logger.debug('Deleting academic calender', { id });
      const result = await this.deleteAcademicCalenderUsecase.execute(id);

      this.logger.log('Successfully deleted academic calender');
      return result;
    } catch (error) {
      this.logger.error('Failed to delete academic calender', {
        error: error.message,
      });
      throw error;
    }
  }
}

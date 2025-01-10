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
import { GetAllAcademicTermUsecase } from '../../domain/usecases/academic-term/getAll-academicTerm.usecase';
import { AddAcademicTermUsecase } from '../../domain/usecases/academic-term/add-academicTerm.usecase';
import { UpdateAcademicTermUsecase } from '../../domain/usecases/academic-term/update-academicTerm.usecase';
import { DeleteAcademicTermUsecase } from '../../domain/usecases/academic-term/delete-academicTerm.usecase';
import { DataState } from '../../../../core/resources/data.state';
import { AcademicTermEntity } from '../../domain/entities/academic-term.entity';
import { UpdateAcademicTermPipe } from '../../pipes/academic-term/update-academicTerm.pipe';
import { AddAcademicTermPipe } from '../../pipes/academic-term/add-academicTerm.pipe';

@Controller('/api/academic-terms')
@UseGuards(RolesGuard)
@Roles(['Admin'])
export class AcademicTermController {
  private readonly logger = new Logger(AcademicTermController.name);
  constructor(
    private readonly getAllAcademicTermUsecase: GetAllAcademicTermUsecase,
    private readonly addAcademicTermUsecase: AddAcademicTermUsecase,
    private readonly updateAcademicTermUsecase: UpdateAcademicTermUsecase,
    private readonly deleteAcademicTermUsecase: DeleteAcademicTermUsecase,
  ) {}

  @Get()
  async getAcademicTerms(): Promise<DataState<AcademicTermEntity[]>> {
    try {
      this.logger.debug('Getting all academic terms');
      const result = await this.getAllAcademicTermUsecase.execute();

      this.logger.log('Successfully retrieved all academic terms');
      return result;
    } catch (error) {
      this.logger.error('Failed to get academic terms', {
        error: error.message,
      });
      throw error;
    }
  }

  @Post()
  async createAcademicTerms(
    @Body(AddAcademicTermPipe) request: AcademicTermEntity,
  ): Promise<DataState<AcademicTermEntity>> {
    try {
      this.logger.debug('Creating academic term', { request });
      const result = await this.addAcademicTermUsecase.execute(request);

      this.logger.log('Successfully created academic term');
      return result;
    } catch (error) {
      this.logger.error('Failed to create academic term', {
        error: error.message,
      });
      throw error;
    }
  }

  @Patch(':id')
  async updateAcademicTerm(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateAcademicTermPipe) request: AcademicTermEntity,
  ): Promise<DataState<AcademicTermEntity>> {
    try {
      this.logger.debug('Updating academic term', { id, request });
      const result = await this.updateAcademicTermUsecase.execute({
        id,
        ...request,
      });

      this.logger.log('Successfully updated academic term');
      return result;
    } catch (error) {
      this.logger.error('Failed to update academic term', {
        error: error.message,
      });
      throw error;
    }
  }

  @Delete(':id')
  async deleteAcademicTerm(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DataState<string>> {
    try {
      this.logger.debug('Deleting academic term', { id });
      const result = await this.deleteAcademicTermUsecase.execute(id);

      this.logger.log('Successfully deleted academic term');
      return result;
    } catch (error) {
      this.logger.error('Failed to delete academic term', {
        error: error.message,
      });
      throw error;
    }
  }
}

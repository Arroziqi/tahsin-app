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
import { GetAllAcademicTermPaymentFeeUsecase } from '../../domain/usecases/academicTerm-paymentFee/getAll-class.usecase';
import { AddAcademicTermPaymentFeeUsecase } from '../../domain/usecases/academicTerm-paymentFee/add-class.usecase';
import { UpdateAcademicTermPaymentFeeUsecase } from '../../domain/usecases/academicTerm-paymentFee/update-class.usecase';
import { DeleteAcademicTermPaymentFeeUsecase } from '../../domain/usecases/academicTerm-paymentFee/delete-class.usecase';
import { AcademicTermPaymentFeeEntity } from '../../domain/entities/academicTerm-paymentFee.entity';
import { AddAcademicTermPaymentFeePipe } from '../../pipes/academicTerm-paymentFee/add-academicTermPaymentFee.pipe';
import { UpdateAcademicTermPaymentFeePipe } from '../../pipes/academicTerm-paymentFee/update-academicTermPaymentFee.pipe';

@Controller('/api/academic-term-payment-fees')
@UseGuards(RolesGuard)
@Roles(['Admin'])
export class AcademicTermPaymentFeeController {
  private readonly logger = new Logger(AcademicTermPaymentFeeController.name);
  constructor(
    private readonly getAllAcademicTermPaymentFeeUsecase: GetAllAcademicTermPaymentFeeUsecase,
    private readonly addAcademicTermPaymentFeeUsecase: AddAcademicTermPaymentFeeUsecase,
    private readonly updateAcademicTermPaymentFeeUsecase: UpdateAcademicTermPaymentFeeUsecase,
    private readonly deleteAcademicTermPaymentFeeUsecase: DeleteAcademicTermPaymentFeeUsecase,
  ) {}

  @Get()
  async getAcademicTermPaymentFees(): Promise<
    DataState<AcademicTermPaymentFeeEntity[]>
  > {
    try {
      this.logger.debug('Getting all academic term payment fees');
      const result = await this.getAllAcademicTermPaymentFeeUsecase.execute();

      this.logger.log('Successfully retrieved all academic term payment fees');
      return result;
    } catch (error) {
      this.logger.error('Failed to get academic term payment fees', {
        error: error.message,
      });
      throw error;
    }
  }

  @Post()
  async createAcademicTermPaymentFee(
    @Body(AddAcademicTermPaymentFeePipe) request: AcademicTermPaymentFeeEntity,
  ): Promise<DataState<AcademicTermPaymentFeeEntity>> {
    try {
      this.logger.debug('Creating academic term payment fee', { request });
      const result =
        await this.addAcademicTermPaymentFeeUsecase.execute(request);

      this.logger.log('Successfully created academic term payment fee');
      return result;
    } catch (error) {
      this.logger.error('Failed to create academic term payment fee', {
        error: error.message,
      });
      throw error;
    }
  }

  @Patch(':id')
  async updateAcademicTermPaymentFee(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateAcademicTermPaymentFeePipe)
    request: AcademicTermPaymentFeeEntity,
  ): Promise<DataState<AcademicTermPaymentFeeEntity>> {
    try {
      this.logger.debug('Updating academic term payment fee', { id, request });
      const result = await this.updateAcademicTermPaymentFeeUsecase.execute({
        id,
        ...request,
      });

      this.logger.log('Successfully updated academic term payment fee');
      return result;
    } catch (error) {
      this.logger.error('Failed to update academic term payment fee', {
        error: error.message,
      });
      throw error;
    }
  }

  @Delete(':id')
  async deleteAcademicTermPaymentFee(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DataState<string>> {
    try {
      this.logger.debug('Deleting academic term payment fee', { id });
      const result = await this.deleteAcademicTermPaymentFeeUsecase.execute(id);

      this.logger.log('Successfully deleted academic term payment fee');
      return result;
    } catch (error) {
      this.logger.error('Failed to delete academic term payment fee', {
        error: error.message,
      });
      throw error;
    }
  }
}

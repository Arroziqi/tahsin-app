import { Roles } from 'src/common/decorators/roles.decorator';
import { DataState } from 'src/core/resources/data.state';
import { RolesGuard } from 'src/features/user-management/guards/roles/roles.guard';
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
import { CourseFeeEntity } from 'src/features/master-data/domain/entities/course-fee.entity';
import { CreateCourseFeePipe } from 'src/features/master-data/pipes/course-fee/create-course-fee.pipe';
import { GetAllCourseFeeUsecase } from 'src/features/master-data/domain/usecases/course-fee/getAll-course-fee.usecase';
import { AddCourseFeeUsecase } from 'src/features/master-data/domain/usecases/course-fee/add-course-fee.usecase';
import { UpdateCourseFeeUsecase } from 'src/features/master-data/domain/usecases/course-fee/update-course-fee.usecase';
import { DeleteCourseFeeUsecase } from 'src/features/master-data/domain/usecases/course-fee/delete-course-fee.usecase';
import { UpdateCourseFeePipe } from 'src/features/master-data/pipes/course-fee/update-course-fee.pipe';

@Controller('/api/course-fee')
@UseGuards(RolesGuard)
@Roles(['Admin'])
export class CourseFeeController {
  private readonly logger = new Logger(CourseFeeController.name);

  constructor(
    private readonly getAllCourseFeeUsecase: GetAllCourseFeeUsecase,
    private readonly createCourseFeeUsecase: AddCourseFeeUsecase,
    private readonly updateCourseFeeUsecase: UpdateCourseFeeUsecase,
    private readonly deleteCourseFeeUsecase: DeleteCourseFeeUsecase,
  ) {}

  @Get()
  async getCourseFees(): Promise<DataState<CourseFeeEntity[]>> {
    try {
      this.logger.debug('Getting all course fees');
      const result = await this.getAllCourseFeeUsecase.execute();

      this.logger.log('Successfully retrieved all course fees');
      return result;
    } catch (error) {
      this.logger.error('Failed to get course fees', { error: error.message });
      throw error;
    }
  }

  @Post()
  async createCourseFee(
    @Body(CreateCourseFeePipe) request: CourseFeeEntity,
  ): Promise<DataState<CourseFeeEntity>> {
    try {
      this.logger.debug('Creating course fee', { request });
      const result = await this.createCourseFeeUsecase.execute(request);

      this.logger.log('Successfully created course fee');
      return result;
    } catch (error) {
      this.logger.error('Failed to create course fee', {
        error: error.message,
      });
      throw error;
    }
  }

  @Patch(':id')
  async updateCourseFee(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateCourseFeePipe) request: CourseFeeEntity,
  ): Promise<DataState<CourseFeeEntity>> {
    try {
      this.logger.debug('Updating course fee', { id, request });
      const result = await this.updateCourseFeeUsecase.execute({
        id,
        ...request,
      });

      this.logger.log('Successfully updated course fee');
      return result;
    } catch (error) {
      this.logger.error('Failed to update course fee', {
        error: error.message,
      });
      throw error;
    }
  }

  @Delete(':id')
  async deleteCourseFee(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DataState<string>> {
    try {
      this.logger.debug('Deleting course fee', { id });
      const result = await this.deleteCourseFeeUsecase.execute(id);

      this.logger.log('Successfully deleted course fee');
      return result;
    } catch (error) {
      this.logger.error('Failed to delete course fee', {
        error: error.message,
      });
      throw error;
    }
  }
}

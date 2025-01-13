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
import { GetAllClassUsecase } from '../../domain/usecases/class/getAll-class.usecase';
import { AddClassUsecase } from '../../domain/usecases/class/add-class.usecase';
import { UpdateClassUsecase } from '../../domain/usecases/class/update-class.usecase';
import { DeleteClassUsecase } from '../../domain/usecases/class/delete-class.usecase';
import { DataState } from '../../../../core/resources/data.state';
import { ClassEntity } from '../../domain/entities/class.entity';
import { UpdateClassPipe } from '../../pipes/class/update-class.pipe';
import { AddClassPipe } from '../../pipes/class/add-class.pipe';

@Controller('/api/classes')
@UseGuards(RolesGuard)
@Roles(['Admin'])
export class ClassController {
  private readonly logger = new Logger(ClassController.name);
  constructor(
    private readonly getAllClassUsecase: GetAllClassUsecase,
    private readonly addClassUsecase: AddClassUsecase,
    private readonly updateClassUsecase: UpdateClassUsecase,
    private readonly deleteClassUsecase: DeleteClassUsecase,
  ) {}

  @Get()
  async getClasses(): Promise<DataState<ClassEntity[]>> {
    try {
      this.logger.debug('Getting all classes');
      const result = await this.getAllClassUsecase.execute();

      this.logger.log('Successfully retrieved all classes');
      return result;
    } catch (error) {
      this.logger.error('Failed to get classes', {
        error: error.message,
      });
      throw error;
    }
  }

  @Post()
  async createClass(
    @Body(AddClassPipe) request: ClassEntity,
  ): Promise<DataState<ClassEntity>> {
    try {
      this.logger.debug('Creating class', { request });
      const result = await this.addClassUsecase.execute(request);

      this.logger.log('Successfully created class');
      return result;
    } catch (error) {
      this.logger.error('Failed to create class', {
        error: error.message,
      });
      throw error;
    }
  }

  @Patch(':id')
  async updateClass(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateClassPipe) request: ClassEntity,
  ): Promise<DataState<ClassEntity>> {
    try {
      this.logger.debug('Updating class', { id, request });
      const result = await this.updateClassUsecase.execute({
        id,
        ...request,
      });

      this.logger.log('Successfully updated class');
      return result;
    } catch (error) {
      this.logger.error('Failed to update class', {
        error: error.message,
      });
      throw error;
    }
  }

  @Delete(':id')
  async deleteClass(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DataState<string>> {
    try {
      this.logger.debug('Deleting class', { id });
      const result = await this.deleteClassUsecase.execute(id);

      this.logger.log('Successfully deleted class');
      return result;
    } catch (error) {
      this.logger.error('Failed to delete class', {
        error: error.message,
      });
      throw error;
    }
  }
}

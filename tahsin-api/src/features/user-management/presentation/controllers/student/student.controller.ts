import {
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { Roles } from '../../../../../common/decorators/roles.decorator';
import { UpdateStudentUseCase } from '../../../domain/usecases/student/updateStudent.usecase';
import { AdminBody } from '../../../../../common/decorators/admin-body.decorator';
import { UpdateStudentPipe } from '../../../pipes/student/updateStudent.pipe';
import { StudentEntity } from '../../../domain/entities/student.entity';
import { DataState } from '../../../../../core/resources/data.state';
import { GetAllStudentUsecase } from '../../../domain/usecases/student/getAllStudent.usecase';

@Controller(`/api/student`)
@UseGuards(RolesGuard)
@Roles(['Admin'])
export class StudentController {
  private readonly logger: Logger = new Logger(StudentController.name);

  constructor(
    private readonly updateStudentUsecase: UpdateStudentUseCase,
    private readonly getAllStudentUsecase: GetAllStudentUsecase,
  ) {}

  @Patch(`/level/:id`)
  async updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @AdminBody(UpdateStudentPipe) request: StudentEntity,
  ): Promise<DataState<StudentEntity>> {
    try {
      this.logger.debug(`getting request for updating student with id ${id}`);
      const result: DataState<StudentEntity> =
        await this.updateStudentUsecase.execute({ ...request, id });
      this.logger.debug(
        `sucessfully sending response for updating student with id ${id}`,
      );
      return result;
    } catch (error) {
      this.logger.error('Failed to update student', {
        error: error.message,
      });
      throw error;
    }
  }

  @Get()
  async getAllStudent(): Promise<DataState<StudentEntity[]>> {
    try {
      this.logger.debug(`getting request for getting all students`);
      const result: DataState<StudentEntity[]> =
        await this.getAllStudentUsecase.execute();

      this.logger.log(`successfully getting all students`);
      return result;
    } catch (error) {
      this.logger.error('Failed to get all students', {
        error: error.message,
      });
      throw error;
    }
  }
}

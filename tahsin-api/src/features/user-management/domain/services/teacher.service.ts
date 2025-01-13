import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { TeacherRepository } from '../repository/teacher.repository';
import { DataState } from '../../../../core/resources/data.state';
import { TeacherEntity } from '../entities/teacher.entity';

@Injectable()
export class TeacherService {
  private readonly logger: Logger = new Logger(TeacherService.name);
  constructor(private readonly teacherRepository: TeacherRepository) {}

  async checkExistingTeacherWithUserId(input: number): Promise<void> {
    this.logger.debug(`Checking if teacher exists for user id: ${input}`);
    const existingTeacher = await this.teacherRepository.findByUserId(input);

    if (existingTeacher.data) {
      this.logger.warn(`Teacher already exists for user id ${input}`);
      throw new ConflictException('User was teacher already');
    }
  }

  async getTeacherId(input: number): Promise<DataState<TeacherEntity>> {
    await this.checkExistingTeacherWithUserId(input);
    return await this.teacherRepository.findByUserId(input);
  }
}

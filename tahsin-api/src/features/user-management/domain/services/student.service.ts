import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { StudentRepository } from '../repository/student.repository';

@Injectable()
export class StudentService {
  private readonly logger: Logger = new Logger(StudentService.name);
  constructor(private readonly studentRepository: StudentRepository) {}

  async checkDuplicateStudent(input: number): Promise<void> {
    this.logger.debug(`Checking student with user id ${input}`);
    const existingStudent = await this.studentRepository.findByUserId(input);

    if (existingStudent.data) {
      this.logger.warn(
        `Student with user id ${existingStudent.data.id} already exists`,
      );
      throw new ConflictException(
        `Student with user id ${existingStudent.data.id} already exists`,
      );
    }
  }
}

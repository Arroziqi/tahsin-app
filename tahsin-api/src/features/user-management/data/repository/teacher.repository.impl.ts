import { DataState } from 'src/core/resources/data.state';
import { Inject, Injectable } from '@nestjs/common';
import { TEACHER_REPO_TOKEN } from 'src/core/const/provider.token';
import { TeacherRepository } from '../../domain/repository/teacher.repository';
import { TeacherEntity } from '../../domain/entities/teacher.entity';

@Injectable()
export class TeacherRepositoryImpl implements TeacherRepository {
  constructor(
    @Inject(TEACHER_REPO_TOKEN)
    private readonly teacherRepository: TeacherRepository,
  ) {}

  create(teacher: TeacherEntity): Promise<DataState<TeacherEntity>> {
    return this.teacherRepository.create(teacher);
  }

  findById(id: number): Promise<DataState<TeacherEntity>> {
    return this.teacherRepository.findById(id);
  }

  findByUserId(userId: number): Promise<DataState<TeacherEntity>> {
    return this.teacherRepository.findByUserId(userId);
  }

  findAll(): Promise<DataState<TeacherEntity[]>> {
    return this.teacherRepository.findAll();
  }

  update(teacher: TeacherEntity): Promise<DataState<TeacherEntity>> {
    return this.teacherRepository.update(teacher);
  }
}

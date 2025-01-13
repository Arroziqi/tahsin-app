import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { CLASS_REPO_TOKEN } from '../../../../core/const/provider.token';
import { ClassRepository } from '../repositories/class.repository';

@Injectable()
export class ClassService {
  private readonly logger = new Logger(ClassService.name);
  constructor(
    @Inject(CLASS_REPO_TOKEN)
    private readonly classRepository: ClassRepository,
  ) {}

  async checkDuplicateClass(name: string): Promise<void> {
    this.logger.debug(`Checking for duplicate class...`);
    const existingClass = await this.classRepository.findByName(name);

    if (existingClass.data) {
      this.logger.warn(`Class already exists...`);
      throw new ConflictException('Class already exists.');
    }
  }

  async checkExistingClass(id: number): Promise<void> {
    this.logger.debug(`Checking for existing class...`);
    const existingClass = await this.classRepository.findById(id);

    if (!existingClass.data) {
      this.logger.warn(`Class not found...`);
      throw new ConflictException('Class not found.');
    }
  }
}

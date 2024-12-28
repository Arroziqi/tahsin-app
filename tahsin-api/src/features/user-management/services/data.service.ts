import { Injectable, Logger } from '@nestjs/common';
import { UserModel } from '../data/models/user.model';
import { UserEntity } from '../domain/entities/user.entity';

@Injectable()
export class DataService {
  private readonly logger = new Logger(DataService.name);

  mapDataModelToEntity(dataModel: UserModel): UserEntity {
    this.logger.debug('Mapping user model to entities');
    return new UserEntity(dataModel);
  }
}

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { UserModel } from '../data/models/user.model';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  private readonly logger = new Logger(UserInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;

    this.logger.debug(`Incoming ${method} request to ${url}`);

    return next.handle().pipe(
      map((response) => {
        if (response?.data) {
          this.logger.debug('Transforming response data to UserModel');
          response.data = plainToInstance(UserModel, response.data, {
            excludeExtraneousValues: false,
          });
          this.logger.debug('Data transformation completed');
        }
        return response;
      }),
    );
  }
}

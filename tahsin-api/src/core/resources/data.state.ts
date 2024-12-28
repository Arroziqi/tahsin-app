import { ErrorEntity } from '../domain/entities/error.entity';

export abstract class DataState<T> {
  data?: T;
  error?: ErrorEntity;

  protected constructor(data?: T, error?: ErrorEntity) {
    this.data = data;
    this.error = error;
  }
}

export class DataSuccess<T> extends DataState<T> {
  constructor(data: T) {
    super(data);
  }
}

export class DataFailed<T> extends DataState<T> {
  constructor(error: ErrorEntity) {
    super(undefined, error);
  }
}

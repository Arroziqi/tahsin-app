export class ErrorEntity {
  statusCode: number;
  message: string;
  errors: any;

  constructor(
    statusCode: number = 500,
    message: string,
    errors: string = 'Error',
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }
}

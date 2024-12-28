import { Catch, ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
import { ZodError } from 'zod';
import { HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(ZodError, HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof ZodError) {
      this.logger.error('Validation error', exception.errors);
      response.status(400).json({
        errors: 'validation error',
      });
    } else if (exception instanceof HttpException) {
      this.logger.error('HTTP exception', exception.getResponse());
      response.status(exception.getStatus()).json({
        errors: exception.getResponse(),
      });
    } else {
      this.logger.error('Unexpected error', exception.message);
      response.status(exception.getStatus()).json({
        errors: exception.message,
      });
    }
  }
}

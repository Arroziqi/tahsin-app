import { Injectable, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  port: string | 8000 = this.configService.get<string>('PORT') || 8000;

  logLevels: LogLevel[] =
    this.configService.get<string>('NODE_ENV') === 'production'
      ? ['warn', 'error']
      : ['error', 'warn', 'log', 'debug', 'verbose'];

  getHello(): string {
    return 'Hello World!';
  }
}

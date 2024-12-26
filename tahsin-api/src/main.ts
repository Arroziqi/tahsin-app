import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { LogLevel } from '@nestjs/common';

async function bootstrap() {
  const appService: AppService = new AppService(new ConfigService());
  const logLevels: LogLevel[] = appService.logLevels;
  const port: string | 8000 = appService.port;

  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
  });

  console.log(
    `Launching NestJS app on port ${port}, URL: http://0.0.0.0:${port}`,
  );

  await app.listen(port);
}
bootstrap();

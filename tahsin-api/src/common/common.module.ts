import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { TimeHelper } from './helper/time.helper';

@Global()
@Module({
  providers: [PrismaService, TimeHelper],
  exports: [PrismaService, TimeHelper],
})
export class CommonModule {}

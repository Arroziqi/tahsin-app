import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { TimeHelper } from './helper/time.helper';
import { UuidService } from './services/uuid.service';

@Global()
@Module({
  providers: [PrismaService, TimeHelper, UuidService],
  exports: [PrismaService, TimeHelper, UuidService],
})
export class CommonModule {}

import { Module } from '@nestjs/common';
import { MasterDataModule } from './master-data/master-data.module';
import { AuthModule } from './user-management/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './user-management/guards/jwt-auth/jwt.auth.guard';
import { GlobalExceptionFilter } from '../core/filter/error.filter';
import { CourseManagementModule } from './course-management/course-management.module';

@Module({
  imports: [MasterDataModule, AuthModule, CourseManagementModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class FeaturesModule {}

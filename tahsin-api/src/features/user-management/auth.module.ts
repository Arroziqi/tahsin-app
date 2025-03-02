import { Global, Logger, Module } from '@nestjs/common';
import { USER_REPO_TOKEN } from 'src/core/const/provider.token';
import { PrismaDataSourcesImpl } from './data/datasources/local/prisma.datasources';
import { AuthController } from './presentation/controllers/auth/auth.controller';
import { AuthService } from './services/auth.service';
import { SignupUsecase } from './domain/usecases/auth/signup.usecase';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { PasswordService } from './services/password.service';
import { DataService } from './services/data.service';
import { RefreshTokenStrategy } from './strategies/refresh.token.strategy';
import refreshConfig from './config/refresh.config';
import { UpdateUsecase } from './domain/usecases/auth/update.usecase';
import { DeleteUsecase } from './domain/usecases/auth/delete.usecase';
import { AddUsersUsecase } from 'src/features/user-management/domain/usecases/auth/add-users.usecase';
import { UserService } from 'src/features/user-management/domain/services/user.service';
import { UpdateUserRoleUsecase } from './domain/usecases/auth/update-role.usecase';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshConfig),
  ],
  controllers: [AuthController],
  providers: [
    UpdateUserRoleUsecase,
    SignupUsecase,
    UpdateUsecase,
    DeleteUsecase,
    AddUsersUsecase,
    UserService,
    AuthService,
    PasswordService,
    DataService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
    Logger,

    {
      provide: USER_REPO_TOKEN,
      useClass: PrismaDataSourcesImpl,
    },
  ],
  exports: [
    UserService,
    {
      provide: USER_REPO_TOKEN,
      useClass: PrismaDataSourcesImpl,
    },
    Logger,
  ],
})
export class AuthModule {}

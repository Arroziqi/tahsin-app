import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DataState } from 'src/core/resources/data.state';
import { UserModel } from '../../../data/models/user.model';
import { SignupUserPipe } from '../../../pipes/auth/signup.user.pipe';
import { UserInterceptor } from '../../../interceptors/user.interceptor';
import { SignupUsecase } from '../../../domain/usecases/auth/signup.usecase';
import { LocalAuthGuard } from '../../../guards/local-auth/local.auth.guard';
import { AuthService } from '../../../services/auth.service';
import { RefreshAuthGuard } from '../../../guards/refresh-auth/refresh.auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { UpdateUsecase } from '../../../domain/usecases/auth/update.usecase';
import { DeleteUsecase } from '../../../domain/usecases/auth/delete.usecase';
import { UpdateUserRolePipe } from 'src/features/user-management/pipes/auth/update-user-role.pipe';
import { UpdateUserRoleUsecase } from 'src/features/user-management/domain/usecases/auth/update-role.usecase';
import { AddUsersPipe } from 'src/features/user-management/pipes/auth/add-users.pipe';
import { AddUsersUsecase } from 'src/features/user-management/domain/usecases/auth/add-users.usecase';
import { UserEntity } from 'src/features/user-management/domain/entities/user.entity';

@Controller('/api/users')
@UseInterceptors(UserInterceptor)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly signupUsecase: SignupUsecase,
    private readonly authService: AuthService,
    private readonly updateUsecase: UpdateUsecase,
    private readonly deleteUsecase: DeleteUsecase,
    private readonly updateRoleUsecase: UpdateUserRoleUsecase,
    private readonly addUsersUsecase: AddUsersUsecase,
  ) {
    this.logger.log('AuthController initialized');
  }

  @Public()
  @Get('/hello')
  async getHello() {
    return 'Helloasas ozi';
  }

  @Public()
  @Post('/signup')
  async signUp(
    @Body(SignupUserPipe) request: UserModel,
  ): Promise<DataState<UserModel>> {
    try {
      this.logger.debug(`Processing signup request for user: ${request.email}`);

      const result = await this.signupUsecase.execute(request);

      this.logger.debug('Signup completed successfully');

      return result;
    } catch (error) {
      this.logger.error('Signup failed', {
        error: error.message,
      });

      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/add-users')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  async addUsers(
    @Body(AddUsersPipe) request: UserEntity[],
  ): Promise<DataState<UserEntity[]>> {
    try {
      this.logger.debug(`Processing add users`);

      const result = await this.addUsersUsecase.execute(request);

      this.logger.debug('add users completed successfully');

      return result;
    } catch (error) {
      this.logger.error('add users failed', {
        error: error.message,
      });

      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Public()
  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    this.logger.debug(
      `Processing signin request for user id: ${req.user.data.id}`,
    );

    try {
      const result = await this.authService.login(req.user.data);

      this.logger.debug('Signin completed successfully');

      return result;
    } catch (error) {
      this.logger.error('Signin failed', {
        error: error.message,
      });

      throw error;
    }
  }

  @Get('/current')
  async getCurrentUser(@Request() req) {
    return req.user;
  }

  @Public()
  @Post('/refresh')
  @UseGuards(RefreshAuthGuard)
  async refreshToken(@Request() req) {
    this.logger.debug(
      `Processing refresh token request for user id: ${req.user.data.id}`,
    );

    try {
      const result = await this.authService.refreshToken(req.user.data);

      this.logger.debug('Refresh token completed successfully');

      return result;
    } catch (error) {
      this.logger.error('Refresh token failed', {
        error: error.message,
      });

      throw error;
    }
  }

  @Post('/signout')
  async signOut(@Request() req) {
    try {
      this.logger.debug(
        `Processing signout request for user id: ${req.user.data.id}`,
      );
      const result = await this.authService.logout(req.user.data.id);

      this.logger.debug('Signout completed successfully');

      return result;
    } catch (error) {
      this.logger.error('Signout failed', {
        error: error.message,
        userId: req.user.data.id,
      });
      throw error;
    }
  }

  @Put('/update/:id')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserModel,
  ) {
    return this.updateUsecase.execute({ ...user, id });
  }

  @Put('/update-role/:id')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  async updateUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateUserRolePipe) user: UserModel,
  ) {
    return this.updateRoleUsecase.execute({ ...user, id });
  }

  @Put('/update')
  async updateCurrentUser(@Request() req, @Body() user: UserModel) {
    return this.updateUsecase.execute({ ...user, id: req.user.data.id });
  }

  @Delete('/delete/:id')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  async deleteUser(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.deleteUsecase.execute(id);
  }
}

import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserBody } from 'src/common/decorators/user-body.decorator';
import { DataState } from 'src/core/resources/data.state';
import { ProfileModel } from 'src/features/user-management/data/models/profile.model';
import { CreateProfileUsecase } from 'src/features/user-management/domain/usecases/profile/create.usecase';
import { GetAllProfileUsecase } from 'src/features/user-management/domain/usecases/profile/get.all.usecase';
import { GetProfileUsecase } from 'src/features/user-management/domain/usecases/profile/get.usecase';
import { UpdateProfileUsecase } from 'src/features/user-management/domain/usecases/profile/update.usecase';
import { RolesGuard } from 'src/features/user-management/guards/roles/roles.guard';
import { CreateProfilePipe } from 'src/features/user-management/pipes/profile/create-profile.pipe';
import { UpdateProfilePipe } from 'src/features/user-management/pipes/profile/update-profile.pipe';

@Controller('/api/profiles')
export class ProfileController {
  constructor(
    private readonly getProfileUsecase: GetProfileUsecase,
    private readonly getAllProfileUsecase: GetAllProfileUsecase,
    private readonly updateProfileUsecase: UpdateProfileUsecase,
    private readonly createProfileUsecase: CreateProfileUsecase,
    private readonly logger: Logger,
  ) {
    this.logger.log('ProfileController initialized');
  }

  @Get('/current')
  async getCurrentProfile(@Request() req): Promise<DataState<ProfileModel>> {
    return await this.getProfileUsecase.execute(req.user.data.id);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(['Admin'])
  async getAllProfiles(): Promise<DataState<ProfileModel[]>> {
    return await this.getAllProfileUsecase.execute();
  }

  @Post('/create')
  async createProfile(
    @UserBody(CreateProfilePipe) profile: ProfileModel,
  ): Promise<DataState<ProfileModel>> {
    return await this.createProfileUsecase.execute(profile);
  }

  @Put('/update')
  async updateCurrentProfile(
    @UserBody(UpdateProfilePipe) profile: ProfileModel,
  ): Promise<DataState<ProfileModel>> {
    return await this.updateProfileUsecase.execute(profile);
  }

  @Put('/update/:id')
  @UseGuards(RolesGuard)
  @Roles(['Admin'])
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profile: ProfileModel,
  ): Promise<DataState<ProfileModel>> {
    return await this.updateProfileUsecase.execute({
      ...profile,
      user_id: id,
    });
  }
}

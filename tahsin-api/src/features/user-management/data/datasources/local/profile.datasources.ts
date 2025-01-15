import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { ErrorEntity } from 'src/core/domain/entities/error.entity';
import { DataState } from 'src/core/resources/data.state';
import { ProfileModel } from '../../models/profile.model';
import { CreateProfileDto } from '../../../presentation/dto/profile/create.dto';
import { UpdateProfileDto } from '../../../presentation/dto/profile/update.dto';

export interface ProfileDatasources {
  create(profile: Required<CreateProfileDto>): Promise<DataState<ProfileModel>>;

  findById(id: number, includeUser?: boolean): Promise<DataState<ProfileModel>>;

  findByUserId(
    userId: number,
    includeUser?: boolean,
  ): Promise<DataState<ProfileModel>>;

  findAll(includeUser?: boolean): Promise<DataState<ProfileModel[]>>;

  update(
    profile: UpdateProfileDto & { id: number },
  ): Promise<DataState<ProfileModel>>;
}

@Injectable()
export class ProfileDatasourcesImpl implements ProfileDatasources {
  private readonly logger = new Logger(ProfileDatasourcesImpl.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(
    profile: Required<CreateProfileDto>,
  ): Promise<DataState<ProfileModel>> {
    try {
      this.logger.log(`Creating profile for user ${profile.user_id}`);
      const data = await this.prismaService.profile.create({
        data: profile,
      });
      this.logger.log(
        `Profile created successfully for user ${profile.user_id}`,
      );
      return {
        data: new ProfileModel(data),
        error: undefined,
      };
    } catch (error) {
      this.logger.error(`Error creating profile: ${error}`);
      return { data: undefined, error: error };
    }
  }

  async findById(
    id: number,
    includeUser?: boolean,
  ): Promise<DataState<ProfileModel>> {
    try {
      this.logger.log(`Finding profile by id: ${id}`);
      const data = await this.prismaService.profile.findUnique({
        where: { id },
        include: {
          user: includeUser,
        },
      });

      if (!data) {
        this.logger.log('Profile not found');
        return {
          data: undefined,
          error: new ErrorEntity(404, 'Profile not found'),
        };
      }

      this.logger.log(`Profile found: ${JSON.stringify(data)}`);
      return {
        data: new ProfileModel({
          ...data,
          user: includeUser ? data.user : undefined,
        }),
        error: undefined,
      };
    } catch (error) {
      this.logger.error(`Error finding profile: ${error}`);
      return { data: undefined, error: error };
    }
  }

  async findByUserId(
    userId: number,
    includeUser?: boolean,
  ): Promise<DataState<ProfileModel>> {
    try {
      this.logger.log(`Finding profile by user id: ${userId}`);
      const data = await this.prismaService.profile.findUnique({
        where: { user_id: userId },
        include: { user: includeUser },
      });

      if (!data) {
        this.logger.log('Profile not found');
        return {
          data: undefined,
          error: new ErrorEntity(404, 'Profile not found'),
        };
      }

      this.logger.log(`Profile found for user id: ${userId}`);
      return {
        data: new ProfileModel({
          ...data,
          user: includeUser ? data.user : undefined,
        }),
        error: undefined,
      };
    } catch (error) {
      this.logger.error(`Error finding profile by user id: ${error}`);
      return { data: undefined, error: error };
    }
  }

  async findAll(includeUser?: boolean): Promise<DataState<ProfileModel[]>> {
    try {
      this.logger.log('Finding all profiles');
      const data = await this.prismaService.profile.findMany({
        include: {
          user: includeUser,
        },
      });
      this.logger.log(`Found profiles: ${JSON.stringify(data)}`);
      return {
        data: data.map(
          (profile) =>
            new ProfileModel({
              ...profile,
              user: includeUser ? profile.user : undefined,
            }),
        ),
        error: undefined,
      };
    } catch (error) {
      this.logger.error(`Error finding all profiles: ${error}`);
      return { data: undefined, error: error };
    }
  }

  async update(
    profile: UpdateProfileDto & { id: number },
  ): Promise<DataState<ProfileModel>> {
    try {
      this.logger.log(`Updating profile: ${JSON.stringify(profile)}`);
      const data = await this.prismaService.profile.update({
        where: { id: profile.id },
        data: profile,
      });
      this.logger.log(`Profile updated successfully`);
      return {
        data: new ProfileModel(data),
        error: undefined,
      };
    } catch (error) {
      this.logger.error(`Error updating profile: ${error}`);
      return { data: undefined, error: error };
    }
  }
}

import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../domain/repository/user.repository';
import { USER_REPO_TOKEN } from 'src/core/const/provider.token';
import { DataState, DataSuccess } from 'src/core/resources/data.state';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from '../types/auth.jwtPayload';
import { UserModel } from '../data/models/user.model';
import refreshConfig from '../config/refresh.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name, {
    timestamp: true,
  });

  constructor(
    @Inject(USER_REPO_TOKEN) private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    @Inject(refreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshConfig>,
  ) {
    this.logger.log('AuthService initialized');
  }

  async validateLocalUser(
    username: string,
    password: string,
  ): Promise<DataState<UserModel>> {
    this.logger.debug(`Validating user with username: ${username}`);

    try {
      const user = await this.userRepository.findByUsername(username, true);

      if (!user.data) {
        this.logger.warn(`User not found with username: ${username}`);
        throw new UnauthorizedException('User not found!');
      }

      const isPasswordValid = await this.passwordService.comparePassword(
        password,
        user.data.password,
      );

      if (!isPasswordValid) {
        this.logger.warn(`Invalid password attempt for username: ${username}`);
        throw new UnauthorizedException('Invalid credentials!');
      }

      this.logger.debug('User validated successfully');

      return user;
    } catch (error) {
      this.logger.error(`User validation failed: ${error.message}`);
      throw error;
    }
  }

  async login(
    user: UserModel,
  ): Promise<
    DataState<UserModel & { accessToken: string; refreshToken: string }>
  > {
    try {
      this.logger.debug(`Attempting login for user ID: ${user.id}`);

      const { accessToken, refreshToken } = await this.generateTokens(user.id);

      this.logger.debug('Hashing refresh token');
      const hashedRefreshToken =
        await this.passwordService.hashedPassword(refreshToken);

      this.logger.debug(
        `Updating hashed refresh token for user ID: ${user.id}`,
      );
      await this.userRepository.updateHashedRefreshToken(
        user.id,
        hashedRefreshToken,
      );

      this.logger.log(`Login successful for user ID: ${user.id}`);

      return new DataSuccess({ ...user, accessToken, refreshToken });
    } catch (error) {
      this.logger.error(`Login failed for user ID: ${user.id}`);
      throw new UnauthorizedException('Login failed');
    }
  }

  async generateTokens(userId: number): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      this.logger.debug(`Generating tokens for user ID: ${userId}`);

      const payload: AuthJwtPayload = { sub: userId };
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(payload),
        this.jwtService.signAsync(payload, this.refreshTokenConfig),
      ]);

      this.logger.debug(`Token generation completed for user ID: ${userId}`);

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error(`Token generation failed for user ID: ${userId}`);
      throw new InternalServerErrorException(
        'Failed to generate authentication tokens',
      );
    }
  }

  async validateJwtUser(userId: number): Promise<DataState<UserModel>> {
    this.logger.debug(`Validating user with ID: ${userId}`);

    const user = await this.userRepository.findById(userId, true);

    if (!user.data) {
      this.logger.warn(`User not found with ID: ${userId}`);
      throw new UnauthorizedException('User not found!');
    }

    return user;
  }

  async validateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<DataState<UserModel>> {
    this.logger.debug(`Validating user with ID: ${userId}`);

    const user = await this.userRepository.findById(userId, true);

    if (!user.data) {
      this.logger.warn(`User not found with ID: ${userId}`);
      throw new UnauthorizedException('User not found!');
    }

    const isRefreshTokenValid = await this.passwordService.comparePassword(
      refreshToken,
      user.data.hashedRefreshToken,
    );

    if (!isRefreshTokenValid) {
      this.logger.warn(`Invalid refresh token for user ID: ${userId}`);
      throw new UnauthorizedException('Invalid refresh token!');
    }

    return user;
  }

  async refreshToken(
    user: UserModel,
  ): Promise<
    DataState<UserModel & { accessToken: string; refreshToken: string }>
  > {
    try {
      this.logger.debug(`Attempting refresh token for user ID: ${user.id}`);

      const { accessToken, refreshToken } = await this.generateTokens(user.id);

      this.logger.debug('Hashing refresh token');
      const hashedRefreshToken =
        await this.passwordService.hashedPassword(refreshToken);

      this.logger.debug(
        `Updating hashed refresh token for user ID: ${user.id}`,
      );
      await this.userRepository.updateHashedRefreshToken(
        user.id,
        hashedRefreshToken,
      );

      this.logger.log(`Refresh token successful for user ID: ${user.id}`);

      return new DataSuccess({ ...user, accessToken, refreshToken });
    } catch (error) {
      this.logger.error(`Refresh token failed for user ID: ${user.id}`);
      throw new UnauthorizedException('Refresh token failed');
    }
  }

  async logout(userId: number): Promise<DataState<string>> {
    try {
      this.logger.debug(`Attempting logout for user ID: ${userId}`);

      await this.userRepository.updateHashedRefreshToken(userId, null);

      this.logger.log(`Logout successful for user ID: ${userId}`);

      return new DataSuccess('Logout successful');
    } catch (error) {
      this.logger.error(
        `Logout failed for user ID: ${userId}: ${error.message}`,
      );

      throw new InternalServerErrorException('Logout failed');
    }
  }
}

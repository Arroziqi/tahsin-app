import { Inject, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import { AuthJwtPayload } from '../types/auth.jwtPayload';
import { AuthService } from '../services/auth.service';
import { DataState } from 'src/core/resources/data.state';
import { UserModel } from '../data/models/user.model';
import refreshConfig from '../config/refresh.config';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  private readonly logger = new Logger(RefreshTokenStrategy.name);

  constructor(
    @Inject(refreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: refreshTokenConfig.secret,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    payload: AuthJwtPayload,
  ): Promise<DataState<UserModel>> {
    try {
      this.logger.debug(`Validating refresh token for user ID: ${payload.sub}`);

      const userId = payload.sub;
      const refreshToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

      return this.authService.validateRefreshToken(userId, refreshToken);
    } catch (error) {
      this.logger.error(`Refresh token validation failed: ${error.message}`);
      throw error;
    }
  }
}

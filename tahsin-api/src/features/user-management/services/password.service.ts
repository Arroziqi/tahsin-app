import { Injectable, Logger } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {
  private readonly logger = new Logger(PasswordService.name);

  async hashedPassword(password: string): Promise<string> {
    this.logger.debug('Hashing password');
    try {
      const hashedPassword = await argon2.hash(password);
      this.logger.debug('Password hashed successfully');
      return hashedPassword;
    } catch (error) {
      this.logger.error('Failed to hash password');
      throw error;
    }
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    this.logger.debug('Comparing passwords');
    try {
      const isMatch = await argon2.verify(hashedPassword, password);
      this.logger.debug(`Password comparison result: ${isMatch}`);
      return isMatch;
    } catch (error) {
      this.logger.error('Failed to compare passwords');
      throw error;
    }
  }
}

import type { AppConfig } from '../../config/type';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service';
import { BigNumber } from 'ethers';

@Injectable()
export class UserService {
  // Buffer (in milliseconds) for signature validity allowance check.
  private timestampBuffer = 300000;
  private logger = new Logger('UserService');

  constructor(
    private configService: ConfigService<AppConfig>,
    private prismaService: PrismaService,
  ) {}

  getLoginMessage(timestamp: string | number = Date.now()) {
    return `Please sign this message to login. Timestamp: ${timestamp}`;
  }

  findUser(address: string) {
    return this.prismaService.user.findUnique({
      where: {
        address,
      },
    });
  }

  isValidMessage(message: string): boolean {
    const now = Date.now();
    const timestamp = message.substring(message.length - 13);

    // Message timestamp is within the timeframe (5 mins).
    if (
      BigNumber.from(now).sub(this.timestampBuffer).lt(timestamp) &&
      BigNumber.from(now).add(this.timestampBuffer).gt(timestamp)
    ) {
      // Message hasn't been modified (e.g.: 3rd-party).
      if (this.getLoginMessage(timestamp) === message) {
        return true;
      }

      return false;
    }

    return false;
  }

  jwtEncodeUser(address: string) {
    const jwtPassPhrase = this.configService.get('jwt.secret', { infer: true });

    return jwt.sign({ address }, jwtPassPhrase, {
      algorithm: 'HS256',
      issuer: 'Twitter App',
      expiresIn: '1d',
    });
  }

  jwtDecodeUser(token: string) {
    const jwtPassPhrase = this.configService.get('jwt.secret', { infer: true });
    return jwt.verify(token, jwtPassPhrase, {
      algorithms: ['HS256'],
      issuer: 'Twitter App',
    });
  }
}

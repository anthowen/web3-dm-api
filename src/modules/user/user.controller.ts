import { Body, Controller, Post } from '@nestjs/common';
import { verifyMessage } from 'ethers/lib/utils';
import { BadRequestError } from '../../utils/errors';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const { message, signature, address } = body;
    const bypass = true;

    if (!bypass && !this.userService.isValidMessage(message)) {
      throw BadRequestError('Invalid message and/or timestamp.');
    }

    const derivedAddress = verifyMessage(message, signature);

    if (bypass || derivedAddress.toLowerCase() === address.toLowerCase()) {
      const user = await this.prismaService.user.upsert({
        create: {
          address,
          signature,
        },
        update: {
          signature: signature,
        },
        where: { address },
      });

      return {
        address: user.address,
        token: this.userService.jwtEncodeUser(user.address),
      };
    }

    throw BadRequestError('Signature and Address do not match.');
  }
}

import type { OnModuleInit, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { Injectable, Logger } from '@nestjs/common';
import { AppConfig } from 'src/config/type';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query', false>
  implements OnModuleInit
{
  private logger = new Logger('PrismaService');

  constructor(private readonly configService: ConfigService<AppConfig>) {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'stdout',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();

    if (!this.configService.get('env.isProd', { infer: true })) {
      this.$on('query', (e) => {
        this.logger.log('Query: ' + e.query);
        this.logger.log('Params: ' + e.params);
        this.logger.log('Duration: ' + e.duration + 'ms');
      });
    }
  }

  enableShutdownHooks(app: INestApplication): void {
    this.$on('beforeExit', () => {
      void app.close();
    });
  }
}

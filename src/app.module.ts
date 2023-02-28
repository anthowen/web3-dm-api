import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app';
import { AppController } from './app.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { ConversationModule } from './modules/conversation/conversation.module';
import { MessageModule } from './modules/message/message.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
      load: [appConfig],
    }),
    PrismaModule,
    ConversationModule,
    MessageModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('conversations*', 'messages*');
    consumer.apply(AuthMiddleware).exclude('users/login').forRoutes('users/*');
  }
}

import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ConversationModule } from '../conversation/conversation.module';

@Module({
  imports: [PrismaModule, ConversationModule],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import type { Request } from '../../utils/types';
import { ConversationService } from '../conversation/conversation.service';
import { GetMessagesRequest } from './dto/get-messages';
import { SendNewMessageRequest } from './dto/send-message.dto';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly conversationService: ConversationService,
  ) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async sendNewMessage(
    @Req() req: Request,
    @Body() { message, conversationId }: SendNewMessageRequest,
  ): Promise<any> {
    const { userId } = req;
    const conversation = await this.conversationService.findConversation(
      conversationId,
      userId,
    );

    await this.messageService.createMessage(conversation, userId, message);

    return {
      userId,
    };
  }

  @Get('conversation/:id')
  async getConversationMessages(
    @Req() req: Request,
    @Param('id') conversationId: number,
    @Query() { limit, after }: GetMessagesRequest,
  ): Promise<any> {
    const { userId } = req;
    const conversation = await this.conversationService.findConversation(
      conversationId,
      userId,
    );

    const messages = await this.messageService.getMessages(
      conversation,
      limit,
      after,
    );

    return {
      success: true,
      data: {
        conversation,
        messages,
      },
    };
  }
}

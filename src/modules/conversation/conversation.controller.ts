import type { Request } from '../../utils/types';
import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { CreateConversationRequest } from './dto/create-conversation.dto';
import { UserService } from '../user/user.service';
import { BadRequestError } from 'src/utils/errors';
import { ConversationService } from './conversation.service';
import { ApproveOrRejectConversationRequest } from './dto/approve-conversation.dto';

@Controller('conversations')
export class ConversationController {
  constructor(
    private readonly userService: UserService,
    private readonly conversationService: ConversationService,
  ) {}

  @Post('/start')
  async startConversation(
    @Req() req: Request,
    @Body() { partner }: CreateConversationRequest,
  ): Promise<any> {
    const { userId } = req;

    const userPartner = await this.userService.findUser(partner);
    if (!userPartner) {
      throw BadRequestError('Partner not found');
    }

    const result = await this.conversationService.findOrCreateConversation(
      userId,
      userPartner.id,
    );

    // TODO: Return different HTTP status code (200 vs 201) based on the find/create result

    return {
      success: true,
      data: result,
    };
  }

  @Put('/approve')
  async approveConversation(
    @Req() req: Request,
    @Body() { conversationId }: ApproveOrRejectConversationRequest,
  ): Promise<any> {
    const { userId } = req;
    const result = await this.conversationService.approveConversation(
      conversationId,
      userId,
      true,
    );

    return {
      success: true,
      data: !!result,
    };
  }

  @Put('/reject')
  async rejectConversation(
    @Req() req: Request,
    @Body() { conversationId }: ApproveOrRejectConversationRequest,
  ): Promise<any> {
    const { userId } = req;
    const result = await this.conversationService.approveConversation(
      conversationId,
      userId,
      false,
    );

    return {
      success: true,
      data: !!result,
    };
  }

  @Get('')
  async getConversations(@Req() req: Request): Promise<any> {
    const { userId } = req;
    const result = await this.conversationService.findAllConversations(userId);

    return {
      success: true,
      data: result,
    };
  }
}

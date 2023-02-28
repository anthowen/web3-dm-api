import { Injectable } from '@nestjs/common';
import { Conversation, ConversationStatus } from '@prisma/client';
import { ForbiddenRequestError } from '../../utils/errors';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private readonly prismaService: PrismaService) {}

  async createMessage(
    conversation: Conversation,
    userId: number,
    message: string,
  ) {
    if (conversation.status !== ConversationStatus.APPROVED) {
      throw ForbiddenRequestError('Conversation is not approved');
    }

    return this.prismaService.message.create({
      data: {
        conversationId: conversation.id,
        senderUserId: userId,
        text: message,
      },
    });
  }

  async getMessages(
    conversation: Conversation,
    limit?: number,
    after?: number,
  ) {
    const take = limit ? (limit > 100 ? 100 : limit) : 100;
    return this.prismaService.message.findMany({
      where: {
        conversationId: conversation.id,
      },
      take,
      skip: after ? 1 : 0,
      cursor: after
        ? {
            id: after,
          }
        : undefined,
      orderBy: [{ createdAt: 'desc' }],
    });
  }
}

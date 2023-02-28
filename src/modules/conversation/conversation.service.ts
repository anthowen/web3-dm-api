import { Injectable } from '@nestjs/common';
import { ConversationStatus } from '@prisma/client';
import { BadRequestError, NotFoundError } from 'src/utils/errors';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOrCreateConversation(starterUserId: number, partnerUserId: number) {
    const existingConversation =
      await this.prismaService.conversation.findFirst({
        where: {
          OR: [
            {
              starterUserId,
              partnerUserId,
            },
            {
              starterUserId: partnerUserId,
              partnerUserId: starterUserId,
            },
          ],
        },
      });

    if (existingConversation) {
      return {
        existing: true,
        conversation: existingConversation,
      };
    }

    return {
      existing: false,
      conversation: await this.prismaService.conversation.create({
        data: {
          starterUserId,
          partnerUserId,
          status: ConversationStatus.PENDING,
        },
      }),
    };
  }

  async findConversation(conversationId: number, participantUserId?: number) {
    const conversation = await this.prismaService.conversation.findUnique({
      where: {
        id: conversationId,
      },
    });

    if (!conversation) {
      throw NotFoundError('Conversation is not found');
    }

    if (
      participantUserId &&
      conversation.partnerUserId !== participantUserId &&
      conversation.starterUserId !== participantUserId
    ) {
      throw BadRequestError('Not your conversation');
    }

    return conversation;
  }

  async findAllConversations(participantUserId: number) {
    const conversations = await this.prismaService.conversation.findMany({
      where: {
        OR: [
          {
            starterUserId: participantUserId,
          },
          {
            partnerUserId: participantUserId,
          },
        ],
      },
    });

    return conversations;
  }

  async approveConversation(
    conversationId: number,
    partnerUserId: number,
    approve: boolean,
  ) {
    const status = approve
      ? ConversationStatus.APPROVED
      : ConversationStatus.REJECTED;
    const conversation = await this.prismaService.conversation.findUnique({
      where: {
        id: conversationId,
      },
    });

    if (!conversation) {
      throw NotFoundError('Conversation is not found');
    }

    if (conversation.partnerUserId !== partnerUserId) {
      throw BadRequestError('Not your incoming conversation');
    }

    if (conversation.status === status) {
      // No need to update status
      return conversation;
    }

    return this.prismaService.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        status,
      },
    });
  }
}

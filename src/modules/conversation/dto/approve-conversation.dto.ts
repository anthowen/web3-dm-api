import { IsNotEmpty, IsNumber } from 'class-validator';

export class ApproveOrRejectConversationRequest {
  @IsNotEmpty()
  @IsNumber()
  conversationId!: number;
}

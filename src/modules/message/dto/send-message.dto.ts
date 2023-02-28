import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class SendNewMessageRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  message!: string;

  @IsNotEmpty()
  @IsNumber()
  conversationId!: number;
}

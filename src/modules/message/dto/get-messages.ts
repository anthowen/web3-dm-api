import { IsOptional, IsNumber } from 'class-validator';

export class GetMessagesRequest {
  @IsOptional()
  @IsNumber()
  after?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}

import { IsOptional, IsNumber } from 'class-validator';
import { EthereumAddress } from '../../../utils/transformers/address';

export class SearchConversationRequest {
  @IsOptional()
  @EthereumAddress()
  address?: string;

  @IsOptional()
  @IsNumber()
  id?: number;
}

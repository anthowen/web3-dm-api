import { IsNotEmpty } from 'class-validator';
import { EthereumAddress } from '../../../utils/transformers/address';

export class CreateConversationRequest {
  @IsNotEmpty()
  @EthereumAddress()
  partner!: string;
}

import { IsNotEmpty, IsString, Length } from 'class-validator';
import { EthereumAddress } from 'src/utils/transformers/address';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsString()
  @EthereumAddress()
  address!: string;

  @IsString()
  @IsNotEmpty()
  @Length(132)
  signature!: string;
}

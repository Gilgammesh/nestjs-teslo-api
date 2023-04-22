import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class NewMessageDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  message: string;
}

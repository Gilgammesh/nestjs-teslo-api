import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Email address'
  })
  @IsString()
  @IsEmail()
  @Transform(({ value }: TransformFnParams) => value.toLowerCase())
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Password'
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string;

  @ApiProperty({
    example: 'Jhon Doe',
    description: 'User full name'
  })
  @IsString()
  @MinLength(3)
  fullName: string;
}

import { IsInt, IsPositive, Min, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    default: 1,
    description: 'Number Page',
    nullable: true,
    required: false,
    minimum: 1
  })
  @Transform(({ value }: TransformFnParams) => +value)
  @IsInt()
  @IsPositive()
  @Min(1)
  @IsNotEmpty()
  @IsOptional()
  page?: number;

  @ApiProperty({
    default: 10,
    description: 'Limit register by Page',
    nullable: true,
    required: false,
    minimum: 1
  })
  @Transform(({ value }: TransformFnParams) => +value)
  @IsInt()
  @IsPositive()
  @Min(1)
  @IsNotEmpty()
  @IsOptional()
  offset?: number;
}

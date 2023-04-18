import { IsInt, IsPositive, Min, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class PaginationDto {
  @Transform(({ value }: TransformFnParams) => +value)
  @IsInt()
  @IsPositive()
  @Min(1)
  @IsNotEmpty()
  @IsOptional()
  page?: number;

  @Transform(({ value }: TransformFnParams) => +value)
  @IsInt()
  @IsPositive()
  @Min(1)
  @IsNotEmpty()
  @IsOptional()
  offset?: number;
}

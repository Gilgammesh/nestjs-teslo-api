import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional, IsArray, IsIn } from 'class-validator';
import { ProductGender } from '../entities/product.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  slug: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  stock: number;

  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  sizes: string[];

  @IsString()
  @IsIn([ProductGender.MEN, ProductGender.WOMEN, ProductGender.KID, ProductGender.UNISEX])
  @IsNotEmpty()
  gender: ProductGender;

  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  tags: string[];

  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  images: string[];
}

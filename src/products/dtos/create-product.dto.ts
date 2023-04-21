import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional, IsArray, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductGender } from '../entities/product.entity';

export class CreateProductDto {
  @ApiProperty({
    example: 'T-Shirt Teslo',
    description: 'Product Title',
    uniqueItems: true
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 100,
    description: 'Product Price'
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  price: number;

  @ApiProperty({
    example: 'T-Shirt Teslo Description',
    description: 'Product Description'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @ApiProperty({
    example: 't_shirt_teslo',
    description: 'Product Slug for SEO',
    required: false,
    uniqueItems: true
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  slug: string;

  @ApiProperty({
    example: 10,
    description: 'Product Stock'
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  stock: number;

  @ApiProperty({
    example: ['S', 'M', 'L', 'XL'],
    description: 'Product Sizes'
  })
  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  sizes: string[];

  @ApiProperty({
    example: ProductGender.MEN,
    description: 'Product Genders',
    enum: ProductGender
  })
  @IsString()
  @IsIn([ProductGender.MEN, ProductGender.WOMEN, ProductGender.KID, ProductGender.UNISEX])
  @IsNotEmpty()
  gender: ProductGender;

  @ApiProperty({
    example: ['shirt', 'hoodie', 'sweatshirt'],
    description: 'Product Tags',
    type: [String]
  })
  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  tags: string[];

  @ApiProperty({
    example: ['image1.jpg', 'image2.jpg'],
    description: 'Product Images',
    type: [String]
  })
  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  images: string[];
}

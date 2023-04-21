import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';
import { AddTimestamps } from 'src/common/decorators/add-timestamps.decorator';
import { ProductImage } from './product-image.entity';
import { User } from 'src/users/entities/user.entity';

export enum ProductGender {
  MEN = 'men',
  WOMEN = 'women',
  KID = 'kid',
  UNISEX = 'unisex'
}

@Entity({ name: 'products' })
@AddTimestamps()
export class Product {
  @ApiProperty({
    example: uuid(),
    description: 'Product ID',
    uniqueItems: true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'T-Shirt Teslo',
    description: 'Product Title',
    uniqueItems: true
  })
  @Column('text', { unique: true })
  title: string;

  @ApiProperty({
    example: 100,
    description: 'Product Price'
  })
  @Column('numeric', { default: 0 })
  price: number;

  @ApiProperty({
    example: 'T-Shirt Teslo Description',
    description: 'Product Description'
  })
  @Column('text', { nullable: true })
  description: string;

  @ApiProperty({
    example: 't_shirt_teslo',
    description: 'Product Slug for SEO',
    uniqueItems: true
  })
  @Column('text', { unique: true })
  slug: string;

  @ApiProperty({
    example: 10,
    description: 'Product Stock'
  })
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty({
    example: ['S', 'M', 'L', 'XL'],
    description: 'Product Sizes'
  })
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty({
    example: ProductGender.MEN,
    description: 'Product Genders',
    enum: ProductGender
  })
  @Column('text')
  gender: ProductGender;

  @ApiProperty({
    example: ['shirt', 'hoodie', 'sweatshirt'],
    description: 'Product Tags',
    type: [String]
  })
  @Column('text', { array: true, default: [] })
  tags: string[];

  @ApiProperty({
    example: [
      {
        id: 1,
        url: 'image1.jpg'
      },
      {
        id: 2,
        url: 'image2.jpg'
      }
    ],
    description: 'Product Images',
    type: [ProductImage]
  })
  @OneToMany(() => ProductImage, (productImage) => productImage.product, { cascade: true, eager: true })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  transformInsertSlug() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .replace(/\s+/g, ' ')
      .toLowerCase()
      .replace(/\s/g, '_')
      .replace(/"/g, '')
      .replace(/'/g, '')
      .replace(/’/g, '');
  }

  @BeforeUpdate()
  transformUpdateSlug() {
    this.slug = this.slug
      .replace(/\s+/g, ' ')
      .toLowerCase()
      .replace(/\s/g, '_')
      .replace(/"/g, '')
      .replace(/'/g, '')
      .replace(/’/g, '');
  }
}

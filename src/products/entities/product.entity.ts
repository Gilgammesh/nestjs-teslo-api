import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  title: string;

  @Column('numeric', { default: 0 })
  price: number;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { unique: true })
  slug: string;

  @Column('int', { default: 0 })
  stock: number;

  @Column('text', { array: true })
  sizes: string[];

  @Column('text')
  gender: ProductGender;

  @Column('text', { array: true, default: [] })
  tags: string[];

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

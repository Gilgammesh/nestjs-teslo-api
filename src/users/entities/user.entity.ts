import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AddTimestamps } from 'src/common/decorators/add-timestamps.decorator';
import { validRoles } from 'src/auth/interfaces';
import { Product } from 'src/products/entities';

@Entity('users')
@AddTimestamps()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text')
  fullName: string;

  @Column('boolean', { default: true })
  isActive: boolean;

  @Column('text', { array: true, default: ['user'] })
  roles: validRoles[];

  @OneToMany(() => Product, (product) => product.user)
  product: Product;
}

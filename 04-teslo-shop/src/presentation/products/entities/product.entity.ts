import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from 'src/presentation/auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'products'})
export class Product {
  
  @ApiProperty({
    example: 'fdb9e978-d935-4a20-b80f-9b6cbe6fb36d',
    description: 'Product Id',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Shoes',
    description: 'Name of product',
    uniqueItems: true,
  })
  @Column('varchar', { length: 250, unique: true })
  title: string;

  @ApiProperty({
    example: 9.99,
    description: 'Product Price',
  })
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty({
    example: 'Winter shoes',
    description: 'Product Description',
    default: '',
  })
  @Column('text', { nullable: true })
  description: string;

  @ApiProperty({
    example: 'Slug',
    description: 'unique name for searchings',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  slug: string;

  @ApiProperty({
    example: 10,
    description: 'Quantity of items of this Product',
  })
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty({
    example: ['M', 'XL', 'SM'],
    description: 'Product Sizes',
  })
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty({
    example: 'men',
    description: 'Product Gender men, woman',
  })
  @Column('text')
  gender: string;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;

  @ApiProperty({
    example: ['Clothes', 'Summer'],
    description: 'Type of product',
  })
  @Column('text', { array: true, default: [] })
  tags: string[];

  @ApiProperty({
    example: ['http://cloudinary/shoe-1.png', 'http://cloudinary/shoe-2.png'],
    description: 'Images from this product',
  })
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {cascade: true, eager: true}) // eager carga la relacion con las imagenes solo funciona con
  images?: ProductImage[]

  @ManyToOne(() => User, (user) => user.products, {eager: true})
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    if (this.slug) {
      this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
    }
  }
}

import { Brand } from 'src/modules/brands/entities/brand.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true, nullable: false })
  title: string;

  @Column({ type: 'numeric', default: 0, precision: 15, scale: 2 })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({type: 'text', nullable: false, unique: true})
  slug: string;

  @Column({type: 'int', default: 0})
  stock: number;

  @Column({type: 'text', array: true})
  sizes: string[];

  @Column({type: 'text'})
  gender: string;

  // tags
  // images

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;
}

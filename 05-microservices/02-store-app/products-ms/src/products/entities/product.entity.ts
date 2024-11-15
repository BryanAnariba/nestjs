import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 150, nullable: false, unique: true })
  public name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public description: string;

  @Column({ type: 'decimal', nullable: false })
  public price: number;

  @Column({ type: 'int', nullable: false })
  public quantity: number;

  @Column({ type: 'boolean', default: true })
  @Index("is_active-idx")
  public is_active: boolean;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'DATETIME()',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'DATETIME()',
    onUpdate: 'DATETIME()',
  })
  public updated_at: Date;

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {eager: true})
  images: ProductImage[];
}

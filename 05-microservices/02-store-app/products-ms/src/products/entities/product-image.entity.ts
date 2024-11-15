import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'product_images' })
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public url: string;

  @ManyToOne(() => Product, (product) => product.images)
  public product: Product;
}

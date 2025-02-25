import { Product } from 'src/modules/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true, nullable: false })
  name: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}

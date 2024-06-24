import { Product } from "src/presentation/products/entities";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {unique: true})
  email: string;

  @Column('text', {select: false})
  password: string;

  @Column('varchar', {length: 150})
  fullName: string;

  @Column('bool', {default: true})
  isActive: boolean;

  @Column('text', {array: true, default: ['USER']})
  roles: string[];

  @OneToMany(
    () => Product, (product) => product.user
  )
  products: Product[];

  @BeforeInsert()
  checkFieldsBeforeInsert () {
    this.email = this.email.toLowerCase().trim();

  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate () {
    this.checkFieldsBeforeInsert();    
  }
}

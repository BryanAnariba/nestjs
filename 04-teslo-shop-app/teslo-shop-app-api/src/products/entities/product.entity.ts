import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'products'})
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {length: 150, nullable: false, unique: true})
  title: string;

  @Column('float', {nullable: false, default: 0})
  price: number;

  @Column('text', {default: '', nullable: true})
  description: string;

  @Column({type: 'varchar', length: 150, unique: true})
  slug: string;

  @Column('int', {default: 0})
  stock: number;

  @Column({type: 'text', array: true})
  sizes: string[];

  @Column('varchar')
  gender: string;

  @Column({type: 'text', array: true, default: []})
  tags: string[];

  @BeforeInsert()
  checkSlug () {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .trim()
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '')
      .replaceAll('-', '_');
  }
  
  @BeforeUpdate()
  checkSlugAgain () {
    this.slug = this.slug
      .trim()
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '')
      .replaceAll('-', '_');
  }

}

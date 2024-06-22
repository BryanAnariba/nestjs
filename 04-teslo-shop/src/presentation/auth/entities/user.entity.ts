import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column('bool', {default: false})
  isActive: boolean;

  @Column('text', {array: true, default: ['USER']})
  roles: string[];
}

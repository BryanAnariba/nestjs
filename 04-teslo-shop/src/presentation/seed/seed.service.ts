import { Inject, Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed.data';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {

  constructor (
    private readonly productService: ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  
  execute () {
    return this.insertRecords();
  }

  private async deleteTables () {
    await this.productService.deleteAllProducts();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  } 

  private async insertUsers () {
    const seedUsers = initialData.users;
    const users: User[] = [];
    seedUsers.forEach(user => {
      users.push(this.userRepository.create(user));
    });

    const usersInserted = await this.userRepository.save(users);
    return usersInserted[0];
  }

  private async insertRecords() {
    await this.deleteTables();
    const firstUser = await this.insertUsers();

    const products = initialData.products;
    const insertProductsPromise = [];
    products.forEach(product => {
      insertProductsPromise.push(this.productService.create(firstUser, product));
    });
    await Promise.all(insertProductsPromise);

    return "Seed executed successfully!";
  }
}

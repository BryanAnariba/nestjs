import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/product.seed';

@Injectable()
export class SeedService {

  constructor (private readonly productService: ProductsService) {}

  public async runProductSeed () {
    await this.productService.deleteAllProducts();
    const seedProducts = initialData.products;
    const insertPromises = [];
    seedProducts.forEach(product => {
      insertPromises.push(this.productService.create(product));
    });
    await Promise.all(insertPromises);
    return "Products Seed Executed!";
  }
}

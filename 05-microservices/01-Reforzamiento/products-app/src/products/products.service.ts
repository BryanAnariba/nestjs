import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { UUIDConfig } from 'src/config';

@Injectable()
export class ProductsService {

  private products: Product[] = [];

  public get returnCurrentProducts () {
    return this.products;
  }

  create(createProductDto: CreateProductDto) {
    const {name, description, price} = createProductDto;
    const newProduct = new Product(UUIDConfig.setUUID(), name, description, price);
    this.products = [newProduct, ...this.products];
    return newProduct;
  }

  findAll() {
    return this.returnCurrentProducts;
  }

  findOne(id: string) {
    const product = this.returnCurrentProducts.find(product => product.id === id);
    if (!product) throw new NotFoundException(`Product with ${id} not found`);
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let productUpdated: Product;
    this.products = this.products.map(
      product => {
        if (product.id === id) {
          product = {...product, ...updateProductDto};
          productUpdated = product;
        }
        return product;
      }
    );
    if (!productUpdated) throw new NotFoundException(`Product ${id} not found.`);
    return productUpdated;
  }

  remove(id: string) {
    this.findOne(id);
    this.products = this.products.filter(product => product.id !== id)
  }
}

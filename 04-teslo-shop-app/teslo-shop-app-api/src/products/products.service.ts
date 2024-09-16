import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import {validate as isUUID} from 'uuid';

import { Product } from './entities/product.entity';
import { handleExceptions } from 'src/config';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductBy } from './interfaces';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      handleExceptions(error);
    }
  }
  
  async findAll(limit: number = 10, offset: number = 0, searchProductBy: SearchProductBy) {
    try {
      // console.log(searchProductBy)
      // const queryBuilder = this.productRepository.createQueryBuilder();
      const [products, totalProducts] = await Promise.all([
        this.productRepository.find({
          where: [],
          take: limit,
          skip: offset,
        }),
        this.productRepository.count(),
      ]);
      return {
        totalData: totalProducts,
        data: products,
      };
    } catch (error) {
      handleExceptions(error);
    }
  }

  async findOne(term: string) {
    try {
      let existsProduct: Product;
      if (isUUID(term)) {
        existsProduct = await this.productRepository.findOneBy({id: term});
      } else {
        const queryBuilder = this.productRepository.createQueryBuilder();
        existsProduct = await queryBuilder
          .where('lower(title)=lower(:title) or lower(slug)=lower(:slug)', {title: term, slug: term})
          .getOne();
      }
      if (!existsProduct) throw new HttpException(`Product not found`, HttpStatus.NOT_FOUND);
      return existsProduct;
    } catch (error) {
      handleExceptions(error);
    }
  }

  async update(product_id: string, updateProductDto: UpdateProductDto) {
    try {
      const existsProduct = await this.productRepository.preload({id: product_id, ...updateProductDto});
      if (!existsProduct) throw new HttpException(`Product not found`, HttpStatus.NOT_FOUND);
      return await this.productRepository.save(existsProduct);
    } catch (error) {
      handleExceptions(error);
    }
  }

  async remove(product_id: string) {
    try {
      const existsProduct = await this.productRepository.findOneBy({id: product_id});
      if (!existsProduct) throw new HttpException(`Product not found`, HttpStatus.NOT_FOUND);
      return await this.productRepository.remove(existsProduct);
    } catch (error) {
      handleExceptions(error);
    }
  }
}


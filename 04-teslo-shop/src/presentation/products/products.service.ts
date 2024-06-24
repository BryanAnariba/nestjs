import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos';
import { UUIDConfig, handleErrors } from 'src/config';
import { Product, ProductImage } from './entities';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class ProductsService {

  constructor (
    @InjectRepository(Product) 
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage) 
    private readonly productImageRepository: Repository<ProductImage>,
    private readonly dataSource: DataSource,
  ) {}

  async create(user: User, createProductDto: CreateProductDto) {
    try {
      const {images = [], ...productDetails} = createProductDto;
      const product = this.productRepository.create({
        ...productDetails,
        user: user,
        images: images.map(image => this.productImageRepository.create({url: image})),
      });
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      handleErrors(error, 'Product');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const [products, totalProducts] = await Promise.all([
        this.productRepository.find({
          where: {
            deletedAt: null
          }, 
          relations: {
            images: true
          },
          skip: paginationDto.offset * paginationDto.limit, 
          take: paginationDto.limit
        }),
        this.productRepository.countBy({deletedAt: null})
      ]);
      return {
        products: products.map(product => ({
          ...product,
          images: product.images.map(img => img.url), // Solo enviar imagenes, ni id ni nada mas
        })),
        totalProducts,
      };
    } catch (error) {
      handleErrors(error, 'Product');
    }
  }

  async findOne(term: string) {
    try {
      let product: Product;
      if (UUIDConfig.isUUID(term)) {
        product = await this.productRepository.findOneBy({id: term, deletedAt: null});
      } else {
        const queryBuilder = this.productRepository.createQueryBuilder('prod');
        product = await queryBuilder
          .where('UPPER(title) = :title or slug = :slug', {
            title: term.toUpperCase(), 
            slug: term.toLowerCase()
          })
          .leftJoinAndSelect('prod.images', 'prodImages')
          .getOne();
      }
      if (!product) throw new HttpException(`Product with code ${term} does not exists`, HttpStatus.BAD_REQUEST);
      return product;
    } catch (error) {
      handleErrors(error, 'Product');
    }
  }

  async update(id: string, user: User, updateProductDto: UpdateProductDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      const {images, ...restOfProduct} = updateProductDto;
      const product = await this.productRepository.preload({id: id, ...restOfProduct});
      if (!product) throw new HttpException(`Product not found`, HttpStatus.NOT_FOUND);

      // Create query runner for transactions, commit or rollback
      await queryRunner.connect();
      await queryRunner.startTransaction();

      // Eliminamos las imagenes si mandamos un arreglo nuevo en el update
      if (images) {
        await queryRunner.manager.delete(ProductImage, {product: {id: id}});
        product.images = images.map(
          (img) => this.productImageRepository.create({url: img})
        );
      }

      product.user = user;
      await queryRunner.manager.save(product);
      await queryRunner.commitTransaction();
      return await this.findOnePlain(id);
    } catch (error) {
      await queryRunner.rollbackTransaction(); // Si algo sale mal restaura
      handleErrors(error, 'Product');
    } finally {
      await queryRunner.release(); // Desconecta o cierra conexion query runner
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);
      const productDeleted = await this.productRepository.softDelete(id);
      return productDeleted;
    } catch (error) {
      handleErrors(error, 'Product');
    }
  }

  async findOnePlain (term: string) {
    const {images = [], ...restOfProduct} = await this.findOne(term);
    return {
      ...restOfProduct,
      images: images.map(img => img.url),
    }
  }

  async deleteAllProducts () {
    const queryProduct = this.productRepository.createQueryBuilder('product');
    const queryProductImage = this.productImageRepository.createQueryBuilder('product');
    try {
      await queryProductImage.delete().where({}).execute();
      return await queryProduct.delete().where({}).execute();
    } catch (error) {
      handleErrors(error, 'Product');
    }
  }
}

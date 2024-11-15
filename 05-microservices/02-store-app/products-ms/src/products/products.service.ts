import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductImage } from './entities/product-image.entity';
import { envs, handleExceptions } from 'src/config';
import { SearchProductByDto } from 'src/common/dtos';
import { deleteImageByFileName } from 'src/uploads/helpers';
import { ImagesType } from 'src/uploads/enums';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const { images = [], ...restOfProduct } = createProductDto;
      const product = this.productRepository.create({
        ...restOfProduct,
      });
      const saved = await this.productRepository.save(product);
      return {
        product: saved,
      };
    } catch (error) {
      handleExceptions(error);
    }
  }

  async findAll(searchProductByDto: SearchProductByDto) {
    const { limit = envs.default_limit, skip = envs.default_skip } =
      searchProductByDto;
    try {
      const searchProductQueryBuilder =
        this.productRepository.createQueryBuilder('product');

      if (searchProductByDto.name) {
        searchProductQueryBuilder.andWhere('product.name LIKE :name', {
          name: `%${searchProductByDto.name}%`,
        });
      }

      if (searchProductByDto.is_active !== undefined) {
        searchProductQueryBuilder.andWhere('product.is_active = :is_active', {
          is_active: searchProductByDto.is_active == 'true' ? true : false,
        });
      }

      if (searchProductByDto.description) {
        searchProductQueryBuilder.andWhere(
          'product.description LIKE :description',
          {
            description: `%${searchProductByDto.description}%`,
          },
        );
      }

      const [products, totalProducts] = await Promise.all([
        searchProductQueryBuilder
          .leftJoinAndSelect('product.images', 'url')
          .take(limit)
          .skip(limit * (skip-1))
          .orderBy('product.created_at', 'DESC')
          .getMany(),
        searchProductQueryBuilder.getCount(),
      ]);

      return {
        data: products,
        totalRecords: totalProducts,
        currentPage: skip,
      };
    } catch (error) {
      handleExceptions(error);
    }
  }

  async findOne(product_id: string) {
    try {
      const existsProduct = await this.productRepository.findOneBy({
        id: product_id,
        is_active: true,
      });
      if (!existsProduct)
        throw new HttpException(`Product Not Found`, HttpStatus.NOT_FOUND);
      return existsProduct;
    } catch (error) {
      handleExceptions(error);
    }
  }

  async update(product_id: string, updateProductDto: UpdateProductDto) {
    try {
      const {images = [], product_id: _, ...restOfProduct} = updateProductDto;
      const existsProduct = await this.productRepository.findOneBy({id: product_id});
      if (!existsProduct) throw new HttpException(`Product Not found`, HttpStatus.NOT_FOUND);

      const productToUpdate = await this.productRepository.preload({
        id: product_id,
        ...restOfProduct
      });
      await this.productRepository.save(productToUpdate);
      return productToUpdate;
    } catch (error) {
      handleExceptions(error);
    }
  }

  async remove(product_id: string) {
    try {
      const existsProduct = await this.productRepository.findOne({where: {id: product_id}});
      existsProduct.is_active = existsProduct.is_active ? false : true;
      const updatedProduct = await this.productRepository.save(existsProduct);
      return updatedProduct;
    } catch (error) {
      handleExceptions(error);
    }
  }

  public async saveProductImages(files: Express.Multer.File[], uuid: string) {
    try {
      const product = await this.findOne(uuid);
      let productImages: ProductImage[] = [];
      files.forEach((file) => {
        productImages = [...productImages, this.productImageRepository.create({product: product, url: file.filename})];
      });
      // console.log(productImages);
      const saved = await this.productImageRepository.save(productImages);
      return {
        product: product,
        images: saved.map(image => image.url),
      }
    } catch (error) {
      handleExceptions(error);
    }
  }

  public async deleteProductImage (product_id: string, product_image_id: string) {
    try {
      const existsProductImage = await this.productImageRepository.findOneBy({id: product_image_id, product: {id: product_id}});
      if (!existsProductImage) throw new HttpException(`Image not found`, HttpStatus.NOT_FOUND);
      const deleted =  await this.productImageRepository.delete(existsProductImage);
      const path = deleteImageByFileName(existsProductImage.url, ImagesType.PRODUCT);
      return {
        deleted: deleted,
        imageDeleted: path,
      };
    } catch (error) {
      handleExceptions(error);
    }
  }
}

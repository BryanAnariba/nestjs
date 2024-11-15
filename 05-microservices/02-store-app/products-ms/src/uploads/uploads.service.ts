import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ImagesType } from './enums';
import { ProductsService } from 'src/products/products.service';
import { deleteImages } from './helpers';
import { handleExceptions } from 'src/config';

@Injectable()
export class UploadsService {
  constructor(private readonly productsService: ProductsService) {}

  public async onSaveImage(files: Express.Multer.File[], uuid: string, imagesType: ImagesType) {
    try {
      switch (imagesType) {
        case ImagesType.PRODUCT:
          return await this.productsService.saveProductImages(files, uuid);
        case ImagesType.USER:
        default:
          throw new Error(`Method to save image not implemented yet`);
      }
    } catch (error) {
      deleteImages(files, ImagesType.PRODUCT);
      handleExceptions(error);
    }
  }
}

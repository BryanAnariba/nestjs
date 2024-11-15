import {
  Controller,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileName } from './helpers';
import { diskStorage } from 'multer';
import { ImagesType } from './enums';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('product/images/:product_id')
  @UseInterceptors(
    FilesInterceptor('files', undefined ,{
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/products',
        filename: fileName,
      }),
    }),
  )
  uploadAndSaveProductImages(
    @Param('product_id', ParseUUIDPipe)
    product_id: string,
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      throw new HttpException(
        'File is required, only accepted images',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.uploadsService.onSaveImage(files, product_id, ImagesType.PRODUCT);
  }
}

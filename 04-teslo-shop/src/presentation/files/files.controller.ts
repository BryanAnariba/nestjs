import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { diskStorage } from 'multer';
import { fileFilter, fileNamer } from './helpers';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Get & Upload Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Post('products')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      }),
      // limits: {fieldSize: 1000}
    }),
  )
  uploadProductFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new HttpException(`Make sure that the file is an image`, HttpStatus.BAD_REQUEST);
    const secureUrl = `${this.configService.get('HOST_API')}/files/products/view/${file.filename}`;
    return {secureUrl};
  }

  @Get('products/view/:imageName')
  findProduct (
    @Param('imageName') imageName: string,
    @Res() res: Response
  ) {
    const path = this.filesService.getStaticProductImage(imageName);
    return res.sendFile(path);
  }
}

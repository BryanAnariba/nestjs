import { join } from 'node:path';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { existsSync } from 'node:fs';

@Injectable()
export class FilesService {

  getStaticProductImage (imageName: string) {
    const path = join(__dirname, `../../../static/products/${imageName}`);
    if (!existsSync(path)) throw new HttpException(`Product Image not found`, HttpStatus.BAD_REQUEST);
    return path;
  }
}

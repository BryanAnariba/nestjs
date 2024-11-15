import { join } from 'node:path';
import { unlinkSync } from 'node:fs';
import { ImagesType } from '../enums';

export const deleteImages = (
  files: Express.Multer.File[],
  imagesType: ImagesType,
) => {
  switch (imagesType) {
    case (imagesType = ImagesType.PRODUCT):
      return files.map((file) => {
        const path = join(
          __dirname,
          '../../../static/products/',
          file.filename,
        );
        unlinkSync(path);
        return path;
      });
    case (imagesType = ImagesType.USER):
    default:
      throw new Error(`Method to eliminate image not implemented yet!`);
  }
};

export const deleteImageByFileName = (
  fileName: string,
  imagesType: ImagesType,
) => {
  switch (imagesType) {
    case (imagesType = ImagesType.PRODUCT):
      const path = join(__dirname, '../../../static/products/', fileName);
      unlinkSync(path);
      return path;
    case (imagesType = ImagesType.USER):
    default:
      throw new Error(`Method to eliminate image not implemented yet!`);
  }
};

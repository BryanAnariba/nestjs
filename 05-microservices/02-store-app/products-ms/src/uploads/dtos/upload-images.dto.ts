import { IsArray, IsNotEmpty } from 'class-validator';

export class UploadImagesDto {
  @IsArray()
  @IsNotEmpty()
  images: Express.Multer.File[];
}

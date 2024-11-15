import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteProductImageDto {
  @IsNotEmpty()
  @IsUUID()
  product_id: string;

  @IsNotEmpty()
  @IsUUID()
  product_image_id: string;
}

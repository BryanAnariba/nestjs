import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsUUID()
  @IsNotEmpty()
  product_id: string;
}

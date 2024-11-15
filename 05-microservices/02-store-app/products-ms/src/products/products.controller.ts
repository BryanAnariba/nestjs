import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductByDto } from 'src/common/dtos';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DeleteProductImageDto } from './dto/delete-product-image.dto';
import { ProductTCP } from 'src/common/constants';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Todo microservicio que se desee contactar con este por ejemplo debe llamarlo con el nombre que le demos al @MessagePattern() y ese es { cmd: 'create_product' }
  @MessagePattern({ cmd: ProductTCP.CREATE_PRODUCT })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern({ cmd: ProductTCP.FIND_PRODUCTS })
  findAll(@Payload() searchProductByDto: SearchProductByDto) {
    return this.productsService.findAll(searchProductByDto);
  }

  @MessagePattern({ cmd: ProductTCP.FIND_PRODUCT })
  findOne(@Payload('product_id') product_id: string) {
    return this.productsService.findOne(product_id);
  }

  @MessagePattern({ cmd: ProductTCP.EDIT_PRODUCT })
  update(
    @Payload() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(updateProductDto.product_id, updateProductDto);
  }

  @MessagePattern({ cmd: ProductTCP.DELETE_PRODUCT })
  remove(@Payload('product_id') product_id: string) {
    return this.productsService.remove(product_id);
  }

  @MessagePattern({ cmd: ProductTCP.DELETE_PRODUCT_IMAGE })
  removeProductImage(
    @Payload() deleteProductImageDto: DeleteProductImageDto
  ) {
    return this.productsService.deleteProductImage(
      deleteProductImageDto.product_id,
      deleteProductImageDto.product_image_id,
    );
  }
}

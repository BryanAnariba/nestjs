import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductByDto } from './dto/search-product-by-term.dto';
import { SearchProductBy } from './interfaces';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(
    @Body() createProductDto: CreateProductDto
  ) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query() searchProductByDto: SearchProductByDto,
  ) {
    const {title, description, slug} = searchProductByDto;
    let searchProductBy: SearchProductBy = {};

    if (title) {
      searchProductBy.title = title;
    }

    if (description) {
      searchProductBy.description = description;
    }

    if (slug) {
      searchProductBy.slug = slug;
    }
    return this.productsService.findAll(searchProductByDto.limit, searchProductByDto.offset, searchProductBy);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlane(term);
  }

  @Patch(':product_id')
  update(@Param('product_id', ParseUUIDPipe) product_id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(product_id, updateProductDto);
  }

  @Delete(':product_id')
  remove(@Param('product_id', ParseUUIDPipe) product_id: string) {
    return this.productsService.remove(product_id);
  }
}

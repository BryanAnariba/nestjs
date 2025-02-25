import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { errorHandleExceptions } from 'src/exceptions/error-handle.exceptions';

@Injectable()
export class BrandsService {

  constructor (
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    try {
      const brand = this.brandRepository.create(createBrandDto);
      return await this.brandRepository.save(brand);
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all brands`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}

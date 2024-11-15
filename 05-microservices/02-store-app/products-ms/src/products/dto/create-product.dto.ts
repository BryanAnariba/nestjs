import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  public name: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  public description: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @Type(() => Number)
  public price: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  public quantity: number;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  public images?: string[];
}

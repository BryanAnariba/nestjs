import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  public title: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  public price?: number;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsString()
  @IsOptional()
  public slug?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  public stock?: number;

  @IsString({ each: true })
  @IsArray()
  public sizes: string[];

  @IsIn(['men', 'women', 'kid', 'unisex'])
  public gender: string;

  @IsString({each: true})
  @IsArray()
  tags: string[];

  @IsString({each: true})
  @IsArray()
  @IsOptional()
  images?: string[];

}

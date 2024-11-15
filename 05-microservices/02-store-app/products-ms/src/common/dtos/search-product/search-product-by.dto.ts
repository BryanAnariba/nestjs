import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class SearchProductByDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  @IsIn(['true', 'false'])
  is_active: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  public limit: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  public skip: number;
}

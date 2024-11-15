import { Type } from 'class-transformer';
import { IsOptional, IsString, Min } from 'class-validator';

export class SearchBookByDto {
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  skip: number;

  @IsString()
  @IsOptional()
  @Type(() => String)
  is_active: string;
}

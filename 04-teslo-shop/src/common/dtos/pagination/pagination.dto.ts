import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  offset?: number;
}
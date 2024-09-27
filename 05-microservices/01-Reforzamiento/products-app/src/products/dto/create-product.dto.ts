import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

  @IsString()
  public name: string;

  @IsString()
  @IsOptional()
  public description: string;

  @IsNumber()
  @Type(() => Number)
  public price: number;

}

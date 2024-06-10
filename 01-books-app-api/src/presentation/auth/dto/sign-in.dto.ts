import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SignInDto {

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

}

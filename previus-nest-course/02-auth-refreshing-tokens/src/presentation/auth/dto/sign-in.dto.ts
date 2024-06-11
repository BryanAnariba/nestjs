import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class SignInDto {

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  public password: string;
  
}

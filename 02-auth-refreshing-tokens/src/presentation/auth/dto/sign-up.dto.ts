import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { SignInDto } from './sign-in.dto';

export class SignUpDto extends PartialType(SignInDto) {

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsStrongPassword()
  public password: string;
  
}

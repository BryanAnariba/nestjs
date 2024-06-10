import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class SignUpDto {

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  public password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  public lastName: string;

}

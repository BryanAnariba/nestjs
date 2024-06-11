import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Bcrypt } from 'src/config';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './interfaces';
import { User } from '../users/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService, 
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn(signInDto: SignInDto) {
    try {
      this.prismaService.$connect();
      const existsUser = await this.userService.getUserByEmail(signInDto.email);
      if (!existsUser) throw new HttpException(`Invalid Credentials - Email`, HttpStatus.BAD_REQUEST);
      if (existsUser && existsUser.isDeleted) throw new HttpException(`User with email ${signInDto.email} is inactive, please contact the ADMININSTRATOR`, HttpStatus.BAD_REQUEST);
      const isMatchPassword = Bcrypt.verifyPassword(signInDto.password, existsUser.password);
      if (!isMatchPassword) throw new HttpException(`Invalid Credentials - Password`, HttpStatus.BAD_REQUEST);
      const {password: _, ...restOfUser} = existsUser;

      return {
        user: restOfUser,
        token: await this.signToken({userId: restOfUser.id, email: restOfUser.email}),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        `Somtime went wrong with Sign In: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      this.prismaService.$disconnect();
    }
  }

  public async signUp(signUpDto: SignUpDto) {
    try {
      this.prismaService.$connect();
      const existsUser = await this.userService.getUserByEmail(signUpDto.email)
      if (existsUser) throw new HttpException(`User with email ${signUpDto.email} already exists`, HttpStatus.BAD_REQUEST);
      const user = await this.prismaService.user.create({
        data: {
          ...signUpDto,
          password: Bcrypt.encryptPassword(signUpDto.password),
        },
      });

      delete user.password;
      return {
        user: user,
        token: await this.signToken({userId: user.id, email: user.email}),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        `Somtime went wrong with Sign Up: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      this.prismaService.$disconnect();
    }
  }

  private async signToken ({userId, email}: JWTPayload) {
    return await this.jwtService.signAsync({userId, email});
  }

  async validate(userId: string, email: string): Promise<User> {
    try {
      this.prismaService.$connect();
      const existsUser = await this.userService.getUserById(userId);
      if (!existsUser) throw new HttpException(`Invalid Credentials - Email`, HttpStatus.UNAUTHORIZED);
      if (existsUser && existsUser.isDeleted) throw new HttpException(`User with email ${email} is inactive, please contact the ADMININSTRATOR`, HttpStatus.BAD_REQUEST);
      const {password: _, ...restOfUser} = existsUser;
      return restOfUser;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        `Somtime went wrong with Sign In: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      this.prismaService.$disconnect();
    }
  }

}

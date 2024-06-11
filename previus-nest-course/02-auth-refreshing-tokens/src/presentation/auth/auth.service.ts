import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Bcrypt } from '../../config';
import { UsersService } from '../users/users.service';
import { Token, UserResponse } from '../interfaces';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

  constructor (
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  
  async signIn (signInDto: SignInDto): Promise<UserResponse> {
    
    const existsUser = await this.usersService.findOneByEmail(signInDto.email);
    if (!existsUser) throw new HttpException(`User ${signInDto.email} does not exists`, HttpStatus.BAD_REQUEST);
    if (existsUser && existsUser.isDeleted) throw new HttpException(`User ${signInDto.email} inactive, please contact the ADMIN`, HttpStatus.BAD_REQUEST);
    
    const isMatchPasswords = Bcrypt.compareThings(signInDto.password, existsUser.password);
    if (!isMatchPasswords) throw new HttpException(`Not valid credentials - Password`, HttpStatus.BAD_REQUEST);
    
    delete existsUser.password;
    delete existsUser.token;
    
    const {token, refreshToken} = await this.getToken(existsUser.id, existsUser.email);
    
    await this.usersService.updateToken(existsUser.id, refreshToken);
    return {
      user: existsUser,
      tokens: {
        token, 
        refreshToken,
      }
    };
  }

  async signUp (signUpDto: SignUpDto): Promise<UserResponse> {
    try {
      const existsUser = await this.usersService.findOneByEmail(signUpDto.email);
      if (existsUser) throw new HttpException(`User ${signUpDto.email} already exists`, HttpStatus.BAD_REQUEST);
      const user = await this.prismaService.user.create({
        data: {
          ...signUpDto,
          password: Bcrypt.encryptThing(signUpDto.password),
        },
      });
      // console.log({user})
      const {password: _, token: __, ...restOfUser} = user;
      const {token, refreshToken} = await this.getToken(user.id, user.email);
      await this.usersService.updateToken(user.id, refreshToken);
      return {
        user: restOfUser,
        tokens: {
          token, 
          refreshToken,
        }
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(`Sometime went wrong sign up user: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async refreshToken (userId: string, refreshedToken: string) {
    console.log({userId, refreshedToken});

    const existsUser = await this.usersService.findOne(userId);
    if (!existsUser) throw new HttpException(`Unauthorized, user does not exists`, HttpStatus.UNAUTHORIZED);
    if (!existsUser.token) throw new HttpException(`Unauthorized`, HttpStatus.UNAUTHORIZED);
    
    const isMatchTokens = Bcrypt.compareThings(refreshedToken, existsUser.token);
    if (!isMatchTokens) throw new HttpException(`Unauthorized, tokens do not matches with each other`, HttpStatus.UNAUTHORIZED);
    
    const {token, refreshToken} = await this.getToken(existsUser.id, existsUser.email);
    delete existsUser.password;

    await this.usersService.updateToken(existsUser.id, refreshToken);
    return {
      user: existsUser,
      tokens: {
        token, 
        refreshToken,
      }
    };
  }

  async logOut (userId: string) {
    await this.usersService.removeTokenFromUser(userId);
    
  }

  private async getToken (userId: string, email: string): Promise<Token> {
    const [token, refreshToken] = await Promise.all([
      this.jwtService.sign(
        {id: userId, email: email}, 
        {secret: this.configService.get('SEED'), expiresIn: '15m'},
      ),
      this.jwtService.sign(
        {id: userId, email: email}, 
        {secret: this.configService.get('REFRESHED_SEED'), expiresIn: '8h'},
      )
    ]);

    return {
      token,
      refreshToken,
    };
  }
}

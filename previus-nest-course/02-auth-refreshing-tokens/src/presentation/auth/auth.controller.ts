import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Request } from 'express';
import { RefreshTokenGuard, TokenGuard } from './common/guards';
import { GetCurrentUser, PublicRoute } from './common/decorators';
import { User } from '../interfaces';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @PublicRoute()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @PublicRoute()
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  // ESTO TIENE RELACION CON JWTSTRATEGY REFRESH, ESTE SE LE MANDA EL SEGUNDO TOKEN Y REFRESCA AMBOS
  @PublicRoute()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  refreshToken (@Req() request: Request) {
    const user = request.user;
    return this.authService.refreshToken(user['id'], user['refreshToken']);
  }


  // ESTO TIENE RELACION CON JWTSTRATEGY, ESTE SE LE MANDA EL PRIMER TOKEN Y QUITA EL SEGUNDO TOKEN DE LA BD
  @Post('log-out')
  @HttpCode(HttpStatus.OK)
  logOut (@GetCurrentUser() user: User) {
    console.log(user)
    return this.authService.logOut(user.id);
  }
}

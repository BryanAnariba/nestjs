import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RefreshTokenGuard, TokenGuard } from './common/guards';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  // ESTO TIENE RELACION CON JWTSTRATEGY REFRESH, ESTE SE LE MANDA EL SEGUNDO TOKEN Y REFRESCA AMBOS
  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  refreshToken (@Req() request: Request) {
    const user = request.user;
    return this.authService.refreshToken(user['id'], user['refreshToken']);
  }


  // ESTO TIENE RELACION CON JWTSTRATEGY, ESTE SE LE MANDA EL PRIMER TOKEN Y QUITA EL SEGUNDO TOKEN DE LA BD
  @UseGuards(TokenGuard)
  @Post('log-out')
  @HttpCode(HttpStatus.OK)
  logOut (@Req() request: Request) {
    const user = request.user;
    // console.log(user)
    return this.authService.logOut(user['id']);
  }
}

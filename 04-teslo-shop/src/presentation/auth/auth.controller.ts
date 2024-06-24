import { Controller, Post, Body, Get, UseGuards, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { GetUser } from './decorators/get-user.decorator';
import { GetRawHeaders } from './decorators/get-raw-headers.decorator';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces/valid-roles.interfaces';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.createNewAccount(signUpDto);
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.userSignIn(signInDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus (
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private-three')
  @Auth(/*ValidRoles.ADMIN*/) // Funciona tanto si envias un role como si no lo envias
  testingPrivateRoute3 (
    @GetUser() user: User,
  ) {
    return {ok: true, user};
  }


  /**/  
  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute (
    @GetUser() user: User,
    @GetUser('email') email: string,
    @GetRawHeaders('rawHeaders') rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return {ok: true, user, email, rawHeaders, headers};
  }

  @Get('private-two')
  @UseGuards(
    AuthGuard(), 
    UserRoleGuard // Guards creados por uno mismo no son instancias osea sin parentesis
  )
  @RoleProtected(ValidRoles.ADMIN, ValidRoles.SALES)
  testingPrivateRoute2 (
    @GetUser() user: User,
  ) {
    return {ok: true, user};
  }
}

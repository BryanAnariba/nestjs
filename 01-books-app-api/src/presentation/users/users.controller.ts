import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/guards';
import { GetUser } from '../auth/decorators';
import { User } from './interfaces';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtGuard)
  getMe (@GetUser() user: User) {
    return user;
  }

  @Patch()
  updateUser () {
    
  }
}

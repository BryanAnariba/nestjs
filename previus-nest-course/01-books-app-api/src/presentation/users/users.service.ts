import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {

  constructor (private readonly prismaService: PrismaService) {}

  public async getUserByEmail (email: string) {
    try {
      this.prismaService.$connect();
      return this.prismaService.user.findFirst({where: {email: email}});
    } catch (error) {
      throw new HttpException(
        `Somtime went wrong with Getting user by code`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      this.prismaService.$disconnect();
    }
  }

  public async getUserById (userId: string) {
    try {
      this.prismaService.$connect();
      return this.prismaService.user.findFirst({where: {id: userId}});
    } catch (error) {
      throw new HttpException(
        `Somtime went wrong with Getting user by code`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      this.prismaService.$disconnect();
    }
  }

  public async findOne (userId: string) {
    try {
      this.prismaService.$connect();
      return this.prismaService.user.findFirst({where: {id: userId}});
    } catch (error) {
      throw new HttpException(
        `Somtime went wrong with Get User`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      this.prismaService.$disconnect();
    }
  }
}

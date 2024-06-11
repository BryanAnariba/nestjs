import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Bcrypt } from '../../config';

@Injectable()
export class UsersService {

  constructor (
    private readonly prismaService: PrismaService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(userId: string) {
    return this.prismaService.user.findFirst({where: {id: userId}});
  }

  findOneByEmail(email: string) {
    return this.prismaService.user.findFirst({where: {email: email}});
  }

  async updateToken (userId: string, token: string) {
    const encryptToken = Bcrypt.encryptThing(token);
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        token: encryptToken,
      },
    });
  }

  async removeTokenFromUser (userId: string) {
    await this.prismaService.user.updateMany({
      where: {
        id: userId,
        token: {
          not: null,
        }
      },
      data: {
        token: null,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

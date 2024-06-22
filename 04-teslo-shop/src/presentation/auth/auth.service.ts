import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Bcrypt, handleErrors } from 'src/config';

@Injectable()
export class AuthService {

  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createNewAccount(signUpDto: SignUpDto) {
    try {
      const user = this.userRepository.create({
        ...signUpDto,
        password: Bcrypt.genEncryptedThing(signUpDto.password),
      });
      await this.userRepository.save(user);
      delete user.password;
      return user;
    } catch (error) {
      handleErrors(error, 'User');
    }
  }

  async userSignIn(signInDto: SignInDto) {
    try {
      const {password, email} = signInDto;
      const user = await this.userRepository.findOne({
        where: {
          email: email
        },
        select: {
          email: true,
          password: true,
        },
      });
      if (!user) throw new HttpException(`Not valid credentials - email`, HttpStatus.UNAUTHORIZED);
      if (!Bcrypt.compareThings(password ,user.password)) throw new HttpException(`Not valid credentials - password`, HttpStatus.UNAUTHORIZED);
      return user;
    } catch (error) {
      handleErrors(error, 'User');
    }
  }
}

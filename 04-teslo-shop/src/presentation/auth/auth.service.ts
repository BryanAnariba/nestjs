import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Bcrypt, handleErrors } from 'src/config';
import { JWTPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createNewAccount(signUpDto: SignUpDto) {
    try {
      const user = this.userRepository.create({
        ...signUpDto,
        password: Bcrypt.genEncryptedThing(signUpDto.password),
      });
      await this.userRepository.save(user);
      delete user.password;
      return {
        user: user,
        token: this.getJwt({
          id: user.id,
          email: user.email, 
          roles: user.roles
        }),
      };
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
          id: true,
          email: true,
          password: true,
          roles: true,
          isActive: true,
        },
      });
      if (!user) throw new HttpException(`Not valid credentials - email`, HttpStatus.UNAUTHORIZED);
      if (!Bcrypt.compareThings(password ,user.password)) throw new HttpException(`Not valid credentials - password`, HttpStatus.UNAUTHORIZED);
      if (!user.isActive) throw new HttpException(`Inactive user`, HttpStatus.UNAUTHORIZED);

      delete user.password;
      delete user.isActive;

      return {
        user: user,
        token: this.getJwt({
          id: user.id,
          email: user.email, 
          roles: user.roles
        }),
      };
    } catch (error) {
      handleErrors(error, 'User');
    }
  }

  public checkAuthStatus(user: User) {
    return {
      user: user,
      token: this.getJwt({
        id: user.id,
        email: user.email, 
        roles: user.roles
      }),
    };
  }

  private getJwt(payload: JWTPayload): string {
    const token = this.jwtService.sign(payload);
    return token;
  }
}

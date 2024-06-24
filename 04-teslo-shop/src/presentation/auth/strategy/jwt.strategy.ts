import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { JWTPayload } from "../interfaces/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {

  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    public readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // En donde espero ese token
    });
  }

  async validate (payload: JWTPayload): Promise<User> {
    const {id} = payload;
    const user = await this.userRepository.findOneBy({id: id});
    if (!user) throw new HttpException(`Not valid token`, HttpStatus.UNAUTHORIZED);
    if (!user.isActive) throw new HttpException(`Inactive user`, HttpStatus.UNAUTHORIZED);
    // console.log(user)
    return user;
  }
}
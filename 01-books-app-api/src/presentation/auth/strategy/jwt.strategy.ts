import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { AuthService } from "../auth.service";
import { Strategy, ExtractJwt } from "passport-jwt";
import { envs } from "src/config";
import { JWTPayload } from "../interfaces";
import { User } from "src/presentation/users/interfaces";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor (
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envs.seed,
    });
  }

  async validate (payload: JWTPayload): Promise<User> {

    if (!payload) throw new UnauthorizedException('Refresh token malformed or not valid');

    // console.log(payload)

    const userResponse = await this.authService.validate(payload.userId, payload.email);
    if (!userResponse) {
      throw new UnauthorizedException();
    }
      
    return userResponse;
  }
}
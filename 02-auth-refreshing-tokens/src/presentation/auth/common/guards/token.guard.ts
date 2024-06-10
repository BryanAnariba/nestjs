import { AuthGuard } from "@nestjs/passport";

export class TokenGuard extends AuthGuard('jwt') {
  constructor () {
    super();
  }
}
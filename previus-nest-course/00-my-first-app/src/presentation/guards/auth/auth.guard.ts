import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    // console.log(request);

    if (!request.headers['authorization']) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    return true;
  }
}

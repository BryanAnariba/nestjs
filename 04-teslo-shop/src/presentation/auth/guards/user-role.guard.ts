import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { ValidRoles } from '../interfaces/valid-roles.interfaces';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: ValidRoles[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();

    if (!req.user)
      throw new HttpException(`User not found`, HttpStatus.BAD_REQUEST);

    // console.log('Entring in UserRoleGuard!', { validRoles, user: req.user });
    
    for (const role of req.user.roles) {
      if (validRoles.includes(role)) {
        return true;
      }
    }

    throw new HttpException(
      `User needs a valid role for this request: ${validRoles}`,
      HttpStatus.BAD_REQUEST,
    );

  }
}

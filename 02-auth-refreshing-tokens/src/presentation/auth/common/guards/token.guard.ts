import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class TokenGuard extends AuthGuard('jwt') {
  constructor (private reflector: Reflector) {
    super();
  }

  // No ejecutar para rutas publicas para eso es
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublicRoute = this.reflector.getAllAndOverride('isPublicRoute', [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si la ruta lleva @Public() pasa
    if (isPublicRoute) return true;

    // Si no ejecuta el token guard y verifica
    return super.canActivate(context);
  }
}
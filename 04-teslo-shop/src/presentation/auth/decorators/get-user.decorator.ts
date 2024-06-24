import { ExecutionContext, HttpException, HttpStatus, createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    // console.log(data);
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (!user) throw new HttpException(`Somtime went wrong user not found in request headers`, HttpStatus.INTERNAL_SERVER_ERROR);
    if (data) return user[data];
    return user;
  }
);
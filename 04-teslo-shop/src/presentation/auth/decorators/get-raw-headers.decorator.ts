import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetRawHeaders = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    // console.log(data);
    const req = ctx.switchToHttp().getRequest();
    return req[data];
  }
);
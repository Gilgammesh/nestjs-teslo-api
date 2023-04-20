import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const RawHeaders = createParamDecorator(function (data: unknown, context: ExecutionContext) {
  const req = context.switchToHttp().getRequest();
  const rawHeaders = <string[]>req.rawHeaders;
  return rawHeaders;
});

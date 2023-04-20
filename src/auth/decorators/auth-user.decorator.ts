import { ExecutionContext, HttpException, HttpStatus, createParamDecorator } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

export const AuthUser = createParamDecorator(function (data: string | string[], context: ExecutionContext) {
  const req = context.switchToHttp().getRequest();
  if (!req.user) {
    throw new HttpException(
      {
        internal_code: 'user_not_found_request',
        message: 'User not found in request'
      },
      HttpStatus.BAD_REQUEST
    );
  }
  const user = req.user as User;
  if (data) {
    if (typeof data === 'string') {
      return user[data];
    }
    if (typeof data === 'object') {
      return data.map((d: string) => ({ [d]: user[d] }));
    }
  }
  return user;
});

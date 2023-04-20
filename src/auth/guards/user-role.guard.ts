import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from 'src/users/entities/user.entity';
import { validRoles } from '../interfaces';
import { META_ROLES } from '../decorators/auth.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles = <validRoles[]>this.reflector.get(META_ROLES, context.getHandler());

    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = <User>req.user;
    if (!user) {
      throw new HttpException(
        {
          internal_code: 'user_not_found_request',
          message: 'User not found in request'
        },
        HttpStatus.BAD_REQUEST
      );
    }
    const findedRol = user.roles.find((rol) => validRoles.includes(rol));
    if (findedRol) return true;

    throw new HttpException(
      {
        internal_code: 'user_not_have_permissions',
        message: `The user ${user.fullName} dont have permissions`
      },
      HttpStatus.FORBIDDEN
    );
  }
}

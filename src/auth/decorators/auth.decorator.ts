import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { validRoles } from '../interfaces';
import { UserRoleGuard } from '../guards/user-role.guard';

export const META_ROLES = 'roles';

export function Auth(...roles: validRoles[]) {
  return applyDecorators(SetMetadata(META_ROLES, roles), UseGuards(AuthGuard(), UserRoleGuard));
}

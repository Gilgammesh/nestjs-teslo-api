import { Controller, Post, Body, HttpStatus, HttpCode, Get, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos';
import { CreateUserDto } from 'src/users/dtos';
import { User } from 'src/users/entities/user.entity';
import { Auth, AuthUser, RoleProtected } from './decorators';
import { UserRoleGuard } from './guards/user-role.guard';
import { validRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check')
  @Auth()
  check(@AuthUser() user: User) {
    return this.authService.check(user);
  }

  // @Get('private')
  // @SetMetadata('roles', ['admin', 'super-user'])
  // @UseGuards(AuthGuard(), UserRoleGuard)
  // testPrivate(@AuthUser() user: User) {
  //   return user;
  // }

  // @Get('private')
  // @RoleProtected(validRoles.SUPER_USER, validRoles.ADMIN)
  // @UseGuards(AuthGuard(), UserRoleGuard)
  // testPrivate(@AuthUser() user: User) {
  //   return user;
  // }

  @Get('private')
  @Auth(validRoles.SUPER_USER, validRoles.ADMIN)
  testPrivate(@AuthUser() user: User) {
    return user;
  }
}

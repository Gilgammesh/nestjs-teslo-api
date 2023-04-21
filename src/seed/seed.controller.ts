import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';
import { Auth, AuthUser } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';
import { User } from 'src/users/entities/user.entity';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @Auth(validRoles.ADMIN)
  populateDB(@AuthUser() user: User) {
    return this.seedService.populateDB(user);
  }
}

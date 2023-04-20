import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AppConfig } from 'src/config/app.config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {
    super({
      secretOrKey: AppConfig().jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;
    const userFinded = await this.usersRepository.findOne({
      where: { id }
    });
    if (!userFinded) {
      throw new HttpException(
        { internal_code: 'token_not_valid', message: 'Token are not valid' },
        HttpStatus.UNAUTHORIZED
      );
    }
    if (!userFinded.isActive) {
      throw new HttpException(
        { internal_code: 'user_disabled', message: 'User are disabled' },
        HttpStatus.UNAUTHORIZED
      );
    }
    return userFinded;
  }
}

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { HandleDbException } from 'src/common/exceptions/handle-db.exception';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dtos';
import { LoginUserDto } from './dtos';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private handleDbException: HandleDbException
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...partialCreateUserDto } = createUserDto;
      const cryptedPassword = await bcrypt.hash(password, 10);
      const newUser = this.usersRepository.create({
        ...partialCreateUserDto,
        password: cryptedPassword
      });
      const userCreated = await this.usersRepository.save(newUser);
      const payload: JwtPayload = { id: userCreated.id };
      const token = await this.generateJwtToken(payload);
      return {
        ...payload,
        token
      };
    } catch (error) {
      this.handleDbException.postgresSqlExceptions(error, this.logger);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const userFinded = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'password', 'isActive']
    });
    if (!userFinded) {
      throw new HttpException(
        { internal_code: 'credentials_not_valid', message: 'Credentials are not valid (email)' },
        HttpStatus.UNAUTHORIZED
      );
    }
    if (!userFinded.isActive) {
      throw new HttpException(
        { internal_code: 'user_disabled', message: 'User are disabled' },
        HttpStatus.UNAUTHORIZED
      );
    }
    const isMatch = await bcrypt.compare(password, userFinded.password);
    if (!isMatch) {
      throw new HttpException(
        { internal_code: 'credentials_not_valid', message: 'Credentials are not valid (password)' },
        HttpStatus.UNAUTHORIZED
      );
    }
    const payload: JwtPayload = { id: userFinded.id };
    const token = await this.generateJwtToken(payload);
    return {
      ...payload,
      token
    };
  }

  async check(user: User) {
    const payload: JwtPayload = { id: user.id };
    const token = await this.generateJwtToken(payload);
    return {
      ...payload,
      token
    };
  }

  private async generateJwtToken(payload: JwtPayload) {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}

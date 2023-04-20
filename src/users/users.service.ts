import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AppConfig } from 'src/config/app.config';
import { HandleDbException } from 'src/common/exceptions/handle-db.exception';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private handleDbException: HandleDbException
  ) {}

  private readonly defaultPage = AppConfig().defaultPage;
  private readonly defaultOffset = AppConfig().defaultOffset;

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...partialCreateUserDto } = createUserDto;
      const cryptedPassword = await bcrypt.hash(password, 10);
      const newUser = this.usersRepository.create({
        ...partialCreateUserDto,
        password: cryptedPassword
      });
      const userCreated = await this.usersRepository.save(newUser);
      delete userCreated.password;
      return userCreated;
    } catch (error) {
      this.handleDbException.postgresSqlExceptions(error, this.logger);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const page = paginationDto.page || this.defaultPage;
    const offset = paginationDto.offset || this.defaultOffset;
    try {
      const users = await this.usersRepository.find({
        skip: (page - 1) * offset,
        take: offset
      });
      return users;
    } catch (error) {
      this.handleDbException.postgresSqlExceptions(error, this.logger);
    }
  }

  async findOne(id: string) {
    const userFinded = await this.usersRepository.findOne({ where: { id } });
    if (!userFinded) {
      throw new HttpException({ internal_code: 'user_not_found', message: 'User not Found' }, HttpStatus.NOT_FOUND);
    }
    return userFinded;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userFinded = await this.findOne(id);
    try {
      Object.assign(userFinded, updateUserDto);
      await this.usersRepository.save(userFinded);
      return userFinded;
    } catch (error) {
      this.handleDbException.postgresSqlExceptions(error, this.logger);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      this.handleDbException.postgresSqlExceptions(error, this.logger);
    }
  }
}

import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Injectable()
export class HandleDbException {
  postgresSqlExceptions(error: any, logger: Logger) {
    logger.error(error);
    if (error.code === '23505') {
      throw new HttpException(
        {
          internal_code: 'unique_violation',
          message: error.detail
        },
        HttpStatus.BAD_REQUEST
      );
    }
    throw new HttpException('Unexpected error, check server logs', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

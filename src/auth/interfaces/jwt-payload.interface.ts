import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

export class JwtPayload {
  @ApiProperty({
    example: uuid(),
    description: 'User ID'
  })
  id: string;
}

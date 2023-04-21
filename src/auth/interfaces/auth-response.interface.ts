import { ApiProperty } from '@nestjs/swagger';
import { JwtPayload } from './jwt-payload.interface';

export class AuthResponse extends JwtPayload {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxMzBjNDgwLTZlODktNDg3Yi04NGJhLTdmZGQ0OWRmZjljMCIsImlhdCI6MTY4MjA1Mjk1NiwiZXhwIjoxNjgyMDYwMTU2fQ.214m229cwVvAY82XJG-t-LDTba8hG1QbKJfeb7MYrX0',
    description: 'User Token'
  })
  token: string;
}

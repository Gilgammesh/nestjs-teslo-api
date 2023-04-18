import { Module } from '@nestjs/common';
import { HandleDbException } from './exceptions/handle-db.exception';

@Module({
  providers: [HandleDbException],
  exports: [HandleDbException]
})
export class CommonModule {}

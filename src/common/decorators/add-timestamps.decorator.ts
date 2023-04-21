import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export function AddTimestamps() {
  return function <T extends new (...args: any[]) => Record<string, any>>(target: T) {
    class TimestampedEntity extends target {
      @ApiProperty()
      @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
      createdAt: Date;

      @ApiProperty()
      @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
      })
      updatedAt: Date;
    }
    Object.defineProperty(TimestampedEntity, 'name', { value: target.name });
    return TimestampedEntity;
  };
}

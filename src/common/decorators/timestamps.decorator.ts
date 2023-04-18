import { Column } from 'typeorm';

export function AddTimestamps() {
  return function <T extends new (...args: any[]) => Record<string, any>>(target: T) {
    class TimestampedEntity extends target {
      @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
      createdAt: Date;

      @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
      })
      updatedAt: Date;
    }
    return TimestampedEntity;
  };
}

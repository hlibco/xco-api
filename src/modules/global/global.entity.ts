import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
} from 'typeorm';

export class GlobalEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @CreateDateColumn()
  @Column({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn()
  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ nullable: true, name: 'deleted_at' })
  deletedAt: Date | null;
}

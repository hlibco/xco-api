import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { GlobalEntity } from '../global/global.entity';
import { User } from '../user/user.entity';

@Entity()
export class Credential extends GlobalEntity {
  @ManyToOne(() => User, user => user.credentials, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    nullable: false,
    length: 60,
  })
  username: string;

  @Column({
    nullable: false,
    length: 60,
  })
  password: string;
}

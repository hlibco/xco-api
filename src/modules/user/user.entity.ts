import { Column, Entity, OneToMany, JoinColumn } from 'typeorm';
import { IsEmail } from 'class-validator';
import { GlobalEntity } from '../global/global.entity';
import { Credential } from '../auth/credential.entity';

@Entity()
export class User extends GlobalEntity {
  @OneToMany(() => Credential, credential => credential.user)
  @JoinColumn()
  credentials: Promise<Credential[]>;

  @Column({
    nullable: true,
    length: 60,
    name: 'first_name',
  })
  firstName: string | null;

  @Column({
    nullable: true,
    length: 90,
    name: 'last_name',
  })
  lastName: string | null;

  @IsEmail()
  @Column({
    nullable: true,
    length: 90,
  })
  email: string | null;
}

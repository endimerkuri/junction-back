import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Relation,
  OneToMany,
} from 'typeorm';
import { Card } from 'src/cards/card.entity';
import { ChargeSession } from 'src/charge-sessions/charge-session.entity';

export enum UserType {
  ADMIN = 'admin',
  CLIENT = 'client',
  MERCHANT = 'merchant',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ type: 'enum', enum: UserType, default: UserType.CLIENT })
  type: UserType;

  @OneToOne(() => Card, (card) => card.user)
  card: Relation<Card>;

  @OneToMany(() => ChargeSession, (chargeSession) => chargeSession.user)
  chargeSessions: Relation<ChargeSession[]>;
}

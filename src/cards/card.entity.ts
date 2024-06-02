import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false, default: 0 })
  balance: number;

  @OneToOne(() => User, (user) => user.card)
  @JoinColumn()
  user: Relation<User>;
}

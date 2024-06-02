import { Port } from 'src/ports/port.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class ChargeSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  portId: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ nullable: false })
  startTime: Date;

  @Column({ nullable: true })
  endTime: Date;

  @ManyToOne(() => Port)
  port: Relation<Port>;

  @ManyToOne(() => User, (user) => user.chargeSessions, {
    onDelete: 'CASCADE',
  })
  user: Relation<User>;
}

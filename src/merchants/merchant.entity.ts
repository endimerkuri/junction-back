import { Station } from 'src/stations/station.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Merchant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false, type: 'uuid' })
  ownerId: string;

  @ManyToOne(() => User)
  owner: User;

  @OneToMany('Station', 'merchant')
  stations: Station[];
}

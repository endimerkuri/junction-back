import { Station } from 'src/stations/station.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
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
  owner: Relation<User>;

  @OneToMany(() => Station, (station) => station.merchant)
  stations: Relation<Station[]>;
}

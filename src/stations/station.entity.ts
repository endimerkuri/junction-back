import { Merchant } from 'src/merchants/merchant.entity';
import { Port } from 'src/ports/port.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

export enum StationStatus {
  ACTIVE = 'active',
  OUT_OF_ORDER = 'out_of_order',
  OCCUPIED = 'occupied',
}

@Entity()
export class Station {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'decimal', nullable: false })
  latitude: number;

  @Column({ type: 'decimal', nullable: false })
  longitude: number;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false, type: 'uuid' })
  merchantId: string;

  @Column({ type: 'enum', enum: StationStatus, default: StationStatus.ACTIVE })
  status: StationStatus;

  @ManyToOne(() => Merchant, (merchant) => merchant.stations, {
    onDelete: 'CASCADE',
  })
  merchant: Relation<Merchant>;

  @OneToMany(() => Port, (port) => port.station)
  ports: Relation<Port[]>;
}

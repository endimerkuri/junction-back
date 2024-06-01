import { Merchant } from 'src/merchants/merchant.entity';
import { Port } from 'src/ports/port.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToOne(() => Merchant, (merchant) => merchant.stations, {
    onDelete: 'CASCADE',
  })
  merchant: Merchant;

  @OneToMany('Port', 'station')
  ports: Port[];
}

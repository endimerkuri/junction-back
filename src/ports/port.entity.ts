import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Station } from 'src/stations/station.entity';

export enum PortType {
  NORMAL = 'normal',
  FAST = 'fast',
}

export enum PortStatus {
  FREE = 'free',
  OCCUPIED = 'occupied',
  NOT_AVAILABLE = 'not_available',
}

@Entity()
export class Port {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: PortType, default: PortType.NORMAL })
  type: PortType;

  @Column({ nullable: false, type: 'uuid' })
  stationId: string;

  @Column({ type: 'decimal', nullable: false })
  price: number;

  @Column({ type: 'decimal', nullable: true })
  dynamicPrice: number;

  @Column({ type: 'decimal', nullable: true })
  requests: number;

  @Column({ type: 'enum', enum: PortStatus, default: PortStatus.FREE })
  status: PortStatus;

  @ManyToOne(() => Station, (station) => station.ports, {
    onDelete: 'CASCADE',
  })
  station: Station;
}

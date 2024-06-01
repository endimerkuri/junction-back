import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Station } from 'src/stations/station.entity';

export enum PortType {
  FAST = 'fast',
  NORMAL = 'normal',
}

@Entity()
export class Port {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  type: PortType;

  @Column({ nullable: false })
  stationId: string;
}

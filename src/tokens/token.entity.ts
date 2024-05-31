import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  token: string;

  @Column({ nullable: false, type: 'uuid' })
  userId: string;

  @Column({ nullable: false })
  expiresAt: Date;

  @ManyToOne(() => User)
  user: User;
}

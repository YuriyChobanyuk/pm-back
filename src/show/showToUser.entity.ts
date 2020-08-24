import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Show } from './show.entity';

@Entity()
export class ShowToUser extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  showId: string;

  @Column({ type: 'bool', default: false })
  isStarred: boolean;

  @ManyToOne(
    () => User,
    user => user.showToUser,
  )
  user: User;

  @ManyToOne(
    () => Show,
    show => show.showToUser,
  )
  show: Show;
}

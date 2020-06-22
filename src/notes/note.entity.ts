import {
  BaseEntity,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '../user/user.entity';

@Entity()
export class Note extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  title: string;

  @Column({
    type: 'text',
  })
  text: string;

  @Column({
    type: 'text',
    array: true,
    default: '{}',
  })
  tags: string[];

  @CreateDateColumn({
    type: 'timestamp',
  })
  creationDate: Date;

  @Column({
    type: 'boolean',
    default: true,
  })
  active: boolean;

  @Exclude()
  @ManyToOne(
    () => User,
    user => user.notes,
  )
  user: User;
}

import {
  BaseEntity,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import NoteTag from './NoteTag.enum';
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

  @Exclude()
  @Column({
    type: 'text',
  })
  text: string;

  @Column({
    type: 'enum',
    enum: NoteTag,
    array: true,
    default: [],
  })
  tags: NoteTag[];

  @CreateDateColumn({
    type: 'timestamp',
  })
  creationDate: Date;

  @Exclude()
  @Column({
    type: 'boolean',
    default: true,
  })
  active: boolean;

  @Exclude()
  @ManyToOne(
    type => User,
    user => user.notes,
  )
  user: User;
}

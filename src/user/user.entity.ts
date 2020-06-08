import {
  BaseEntity,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column, OneToMany,
} from 'typeorm';
import { UserRole } from './user-role.enum';
import { Exclude } from 'class-transformer';
import { Note } from '../notes/note.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 255,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: UserRole.USER,
  })
  role: UserRole;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;

  @Exclude()
  @Column({
    type: 'boolean',
    default: true,
  })
  active: boolean;

  @Column({
    type: 'varchar',
    length: 255,
    default: null,
  })
  img_path: string;

  @OneToMany(type => Note, note => note.user)
  notes: Note[]
}

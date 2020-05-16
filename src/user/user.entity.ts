import {
  BaseEntity,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { UserRole } from './user-role.enum';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: "varchar",
    length: 255
  })
  name: string;

  @Column({
    type: "varchar",
    length: 255,
    select: false
  })
  password: string;

  @Column({
    type: "varchar",
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 20,
    default: UserRole.USER
  })
  role: UserRole;

  @CreateDateColumn({
    type: 'timestamp',
    select: false
  })
  created_at: Date;

  @Column({
    type: "varchar",
    length: 255,
    default: true,
    select: false
  })
  active: boolean;

  @Column({
    type: 'varchar',
    length: 255,
    default: null
  })
  img_path: string;
}

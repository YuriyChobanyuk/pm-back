import { ShowType } from './show-type.enum';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ShowStatus } from './show-status.enum';
import { ShowToUser } from './showToUser.entity';

@Entity()
export class Show extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  creationDate: Date;

  @Column({ type: 'enum', enum: ShowStatus, default: ShowStatus.UNKNOWN })
  status: ShowStatus;

  @Column({ type: 'varchar', length: 255, unique: true })
  title: string;

  @Column({ type: 'varchar', length: 20 })
  year: string;

  @Column({ type: 'timestamp' })
  released: Date;

  @Column({ type: 'simple-array' })
  genre: string[];

  @Column({ type: 'varchar', length: 100 })
  director: string;

  @Column({ type: 'simple-array' })
  actors: string[];

  @Column({ type: 'varchar', length: 500 })
  poster: string;

  @Column({ type: 'float' })
  imdbRating: number;

  @Column({ type: 'varchar', length: 10 })
  imdbId: string;

  @Column({ type: 'enum', enum: Object.values(ShowType) })
  type: ShowType;

  @Column({ type: 'int', default: 0 })
  totalSeasons?: number;

  @OneToMany(
    () => ShowToUser,
    showToUser => showToUser.show,
  )
  showToUser: ShowToUser[];
}

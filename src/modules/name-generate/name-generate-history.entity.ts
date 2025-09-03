import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('name_generate_history')
export class NameGenerateHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  name_number: number;

  @Column('varchar')
  name_format: string;

  @Column('text')
  names: string;

  @CreateDateColumn()
  created_at: Date;
}

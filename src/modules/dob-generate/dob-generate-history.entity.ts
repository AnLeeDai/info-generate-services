import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class DobGenerateHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dob_number: number;

  @Column()
  dob_format: string;

  @Column('text')
  dobs: string;

  @CreateDateColumn()
  created_at: Date;
}
